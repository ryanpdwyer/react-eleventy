/**
 * HPLC simulator: data analysis
 *
 * Derivative-based peak detection on a stored signal, in the spirit of a
 * chromatography data system integrator: a peak starts where the smoothed
 * slope exceeds the slope sensitivity, ends where it flattens out again, and
 * unresolved neighbours are split by a drop line at the valley.
 *
 * Areas are in mAU*s, widths in min.
 */

export function defaultIntegration() {
    return { slope: 0, peakWidth: 0.05, minArea: 1, minHeight: 0.2, t0: 0 };
}

function smooth(y, half) {
    if (half < 1) return Float64Array.from(y);
    const n = y.length, out = new Float64Array(n);
    let s = 0, cnt = 0, lo = 0, hi = -1;
    for (let i = 0; i < n; i++) {
        const a = Math.max(0, i - half), b = Math.min(n - 1, i + half);
        while (hi < b) { hi++; s += y[hi]; cnt++; }
        while (lo < a) { s -= y[lo]; lo++; cnt--; }
        out[i] = s / cnt;
    }
    return out;
}

function median(a) {
    const b = Float64Array.from(a).sort();
    return b.length ? b[Math.floor(b.length / 2)] : 0;
}

/**
 * Integrate one signal.
 * t in min, y in mAU. Returns { peaks, slopeUsed }.
 */
export function integrate(t, y, opt) {
    const n = t.length;
    if (n < 12) return { peaks: [], slopeUsed: 0 };
    const dt = (t[n - 1] - t[0]) / (n - 1);
    const half = Math.max(1, Math.round(opt.peakWidth / dt / 4));
    const ys = smooth(y, half);
    const d = new Float64Array(n);
    for (let i = 1; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i - 1]) / (2 * dt);
    d[0] = d[1]; d[n - 1] = d[n - 2];

    // slope sensitivity: from the noise in the derivative unless the user set one
    const absd = new Float64Array(n);
    for (let i = 0; i < n; i++) absd[i] = Math.abs(d[i]);
    const noise = median(absd) / 0.6745;
    const thr = opt.slope > 0 ? opt.slope : Math.max(0.15, 7 * noise);

    // find segments: start, apex, end
    const raw = [];
    let i = 1;
    const hold = Math.max(2, half);
    while (i < n - 2) {
        if (d[i] > thr && d[i + 1] > thr) {
            let s = i;
            while (s > 0 && d[s - 1] > thr * 0.15) s--;
            let j = i, apex = i, type0 = raw.length && raw[raw.length - 1].end === s ? 'V' : 'B';
            // climb
            while (j < n - 1 && d[j] > 0) j++;
            apex = j;
            for (let q = Math.max(s, j - 3); q <= Math.min(n - 1, j + 3); q++) if (y[q] > y[apex]) apex = q;
            // descend
            let e = apex, flat = 0, type1 = 'B';
            while (e < n - 1) {
                e++;
                if (d[e] > thr && d[Math.min(n - 1, e + 1)] > thr) {
                    // rising again: walk back to the valley
                    let v = e;
                    while (v > apex + 1 && ys[v - 1] <= ys[v]) v--;
                    e = v; type1 = 'V';
                    break;
                }
                if (Math.abs(d[e]) < thr * 0.15) { if (++flat >= hold) break; } else flat = 0;
            }
            raw.push({ start: s, apex, end: e, type: type0 + type1 });
            i = e;
            if (type1 === 'B') i++;
        } else i++;
    }
    // fix valley-start flags and group into clusters sharing one baseline
    for (let k = 0; k < raw.length; k++) {
        const prevV = k > 0 && raw[k - 1].type[1] === 'V';
        if (prevV) raw[k].start = raw[k - 1].end;
        raw[k].type = (prevV ? 'V' : 'B') + raw[k].type[1];
    }
    const peaks = [];
    let k = 0;
    while (k < raw.length) {
        let m = k;
        while (m < raw.length - 1 && raw[m].type[1] === 'V') m++;
        const a = raw[k].start, b = raw[m].end;
        const ya = ys[a], yb = ys[b];
        const base = q => ya + (yb - ya) * (t[q] - t[a]) / Math.max(1e-9, t[b] - t[a]);
        for (let q = k; q <= m; q++) {
            const r = raw[q];
            let area = 0;
            for (let p = r.start; p < r.end; p++) {
                area += 0.5 * ((y[p] - base(p)) + (y[p + 1] - base(p + 1))) * (t[p + 1] - t[p]);
            }
            area *= 60;
            // apex by parabolic interpolation on the smoothed, baseline-corrected signal
            let ap = r.apex;
            const h0 = y[ap] - base(ap);
            let rt = t[ap], height = h0;
            if (ap > 0 && ap < n - 1) {
                const y0 = y[ap - 1] - base(ap - 1), y2 = y[ap + 1] - base(ap + 1);
                const den = y0 - 2 * h0 + y2;
                if (den < 0) {
                    const off = clampNum(0.5 * (y0 - y2) / den, -0.5, 0.5);
                    rt = t[ap] + off * dt; height = h0 - 0.25 * (y0 - y2) * off;
                }
            }
            const cross = frac => {
                // times where the corrected signal crosses frac*height on each side
                const lvl = frac * height;
                let l = ap, rr = ap;
                while (l > r.start && y[l] - base(l) > lvl) l--;
                while (rr < r.end && y[rr] - base(rr) > lvl) rr++;
                const li = (y[l] - base(l) > lvl), ri = (y[rr] - base(rr) > lvl);
                const interp = (p, q) => {
                    const yp = y[p] - base(p), yq = y[q] - base(q);
                    return t[p] + (lvl - yp) / (yq - yp || 1e-12) * (t[q] - t[p]);
                };
                return { left: li ? null : interp(l, l + 1), right: ri ? null : interp(rr - 1, rr) };
            };
            const w50 = cross(0.5), w05 = cross(0.05), w10 = cross(0.10);
            const pk = {
                rt, area, height, type: r.type, tStart: t[r.start], tEnd: t[r.end],
                baseStart: base(r.start), baseEnd: base(r.end), iStart: r.start, iEnd: r.end, iApex: ap,
                width: (w50.left !== null && w50.right !== null) ? w50.right - w50.left : null,
                tailing: (w05.left !== null && w05.right !== null) ? (w05.right - w05.left) / (2 * (rt - w05.left)) : null,
                symmetry: (w10.left !== null && w10.right !== null) ? (w10.right - rt) / (rt - w10.left) : null,
            };
            pk.plates = pk.width ? 5.545 * (rt / pk.width) ** 2 : null;
            peaks.push(pk);
        }
        k = m + 1;
    }
    const kept = peaks.filter(p => p.area >= opt.minArea && p.height >= opt.minHeight);
    let total = 0;
    for (const p of kept) total += p.area;
    kept.forEach((p, idx) => {
        p.num = idx + 1;
        p.areaPct = total > 0 ? 100 * p.area / total : 0;
        const prev = kept[idx - 1];
        p.resolution = (prev && prev.width && p.width) ? 1.18 * (p.rt - prev.rt) / (prev.width + p.width) : null;
        p.k = opt.t0 > 0 ? (p.rt - opt.t0) / opt.t0 : null;
    });
    return { peaks: kept, slopeUsed: thr };
}

function clampNum(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }

export function signalCSV(file, sigIndex) {
    const rows = [`# ${file.name}; ${file.sample}; ${file.sigInfo[sigIndex].label}`, 'time_min,absorbance_mAU'];
    const y = file.sig[sigIndex];
    for (let i = 0; i < file.t.length; i++) rows.push(file.t[i].toFixed(4) + ',' + y[i].toFixed(4));
    return rows.join('\n');
}

export function peakCSV(entries) {
    const rows = ['data_file,sample,vial,inj_vol_uL,signal,peak,rt_min,type,width_min,area_mAU_s,height_mAU,area_pct,symmetry,tailing_USP,plates,resolution,k'];
    const f = (x, d) => x === null || x === undefined ? '' : x.toFixed(d);
    for (const e of entries) {
        for (const p of e.peaks) {
            rows.push([e.file.name, '"' + e.file.sample.replace(/"/g, "'") + '"', e.file.pos, e.file.injVol, '"' + e.label + '"', p.num,
            f(p.rt, 4), p.type, f(p.width, 4), f(p.area, 3), f(p.height, 3), f(p.areaPct, 2), f(p.symmetry, 3), f(p.tailing, 3),
            f(p.plates, 0), f(p.resolution, 2), f(p.k, 3)].join(','));
        }
    }
    return rows.join('\n');
}
