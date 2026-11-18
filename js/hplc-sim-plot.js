/**
 * HPLC simulator: a small canvas line plot
 *
 * Drag to zoom, double-click to reset. Supports a second y axis (pressure),
 * min/max decimation for long traces, and peak annotations.
 */
function niceStep(span, target) {
    const raw = span / target, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
    return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}
function fmtTick(v, step) {
    const d = Math.max(0, Math.min(6, -Math.floor(Math.log10(step) + 1e-9)));
    return v.toFixed(d);
}

export class Plot {
    constructor(canvas, opt = {}) {
        this.cv = canvas; this.ctx = canvas.getContext('2d');
        this.opt = Object.assign({ xLabel: 'Time (min)', yLabel: 'Absorbance (mAU)', y2Label: '', minYSpan: 2 }, opt);
        this.series = []; this.peaks = []; this.marker = null;
        this.zoom = null; this.drag = null; this.xFixed = null;
        this.m = { l: 58, r: 14, t: 12, b: 36 };
        canvas.addEventListener('mousedown', e => { this.drag = { x0: e.offsetX, y0: e.offsetY, x1: e.offsetX, y1: e.offsetY }; });
        canvas.addEventListener('mousemove', e => {
            if (this.drag) { this.drag.x1 = e.offsetX; this.drag.y1 = e.offsetY; this.draw(); }
            else if (this.opt.onHover) this.opt.onHover(this.toData(e.offsetX, e.offsetY));
        });
        const up = e => {
            if (!this.drag) return;
            const d = this.drag; this.drag = null;
            if (Math.abs(d.x1 - d.x0) > 6 && Math.abs(d.y1 - d.y0) > 6) {
                const a = this.toData(Math.min(d.x0, d.x1), Math.max(d.y0, d.y1));
                const b = this.toData(Math.max(d.x0, d.x1), Math.min(d.y0, d.y1));
                this.zoom = { x0: a.x, x1: b.x, y0: a.y, y1: b.y };
            } else if (this.opt.onClick) this.opt.onClick(this.toData(d.x0, d.y0));
            this.draw();
        };
        canvas.addEventListener('mouseup', up);
        canvas.addEventListener('mouseleave', () => { if (this.drag) { this.drag = null; this.draw(); } });
        canvas.addEventListener('dblclick', () => { this.zoom = null; this.draw(); });
    }

    toData(px, py) {
        const v = this.view;
        if (!v) return { x: 0, y: 0 };
        return { x: v.x0 + (px - v.px0) / v.pw * (v.x1 - v.x0), y: v.y1 - (py - v.py0) / v.ph * (v.y1 - v.y0) };
    }

    resize() {
        const cv = this.cv, r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
        const w = Math.max(50, Math.round(r.width)), h = Math.max(50, Math.round(r.height));
        if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
        this.w = w; this.h = h; this.dpr = dpr;
    }

    draw() {
        this.resize();
        const { ctx, w, h, dpr, m } = this;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const has2 = this.series.some(s => s.axis === 2);
        const mr = has2 ? 52 : m.r;
        const px0 = m.l, py0 = m.t, pw = w - m.l - mr, ph = h - m.t - m.b;

        // ranges
        let x0 = Infinity, x1 = -Infinity;
        for (const s of this.series) if (s.x.length) { x0 = Math.min(x0, s.x[0]); x1 = Math.max(x1, s.x[s.x.length - 1]); }
        if (!isFinite(x0)) { x0 = 0; x1 = 1; }
        if (this.xFixed) { x0 = this.xFixed[0]; x1 = this.xFixed[1]; }
        if (this.zoom) { x0 = this.zoom.x0; x1 = this.zoom.x1; }
        if (x1 - x0 < 1e-6) x1 = x0 + 1;
        const range = axis => {
            let lo = Infinity, hi = -Infinity;
            for (const s of this.series) {
                if ((s.axis || 1) !== axis) continue;
                for (let i = 0; i < s.x.length; i++) {
                    if (s.x[i] < x0 || s.x[i] > x1) continue;
                    const y = s.y[i];
                    if (y < lo) lo = y; if (y > hi) hi = y;
                }
            }
            if (!isFinite(lo)) { lo = 0; hi = 1; }
            const minSpan = axis === 1 ? this.opt.minYSpan : 10;
            if (hi - lo < minSpan) { const c = 0.5 * (hi + lo); lo = c - minSpan / 2; hi = c + minSpan / 2; }
            const pad = 0.07 * (hi - lo);
            return [lo - pad, hi + pad * 1.6];
        };
        let [y0, y1] = range(1);
        if (this.zoom) { y0 = this.zoom.y0; y1 = this.zoom.y1; }
        const [z0, z1] = has2 ? range(2) : [0, 1];
        this.view = { x0, x1, y0, y1, px0, py0, pw, ph };
        const X = x => px0 + (x - x0) / (x1 - x0) * pw;
        const Y = y => py0 + (y1 - y) / (y1 - y0) * ph;
        const Y2 = y => py0 + (z1 - y) / (z1 - z0) * ph;

        // grid and axes
        const css = getComputedStyle(this.cv);
        const ink = css.getPropertyValue('--ink').trim() || '#1f2d3d';
        const grid = css.getPropertyValue('--grid').trim() || '#e3e9ef';
        ctx.fillStyle = css.getPropertyValue('--plot-bg').trim() || '#fff';
        ctx.fillRect(px0, py0, pw, ph);
        ctx.font = '11px system-ui, sans-serif'; ctx.lineWidth = 1;
        const sx = niceStep(x1 - x0, Math.max(3, pw / 80)), sy = niceStep(y1 - y0, Math.max(3, ph / 40));
        ctx.strokeStyle = grid; ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        for (let v = Math.ceil(x0 / sx) * sx; v <= x1 + 1e-9; v += sx) {
            const p = Math.round(X(v)) + 0.5;
            ctx.beginPath(); ctx.moveTo(p, py0); ctx.lineTo(p, py0 + ph); ctx.stroke();
            ctx.fillText(fmtTick(v, sx), p, py0 + ph + 5);
        }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) {
            const p = Math.round(Y(v)) + 0.5;
            ctx.beginPath(); ctx.moveTo(px0, p); ctx.lineTo(px0 + pw, p); ctx.stroke();
            ctx.fillText(fmtTick(v, sy), px0 - 6, p);
        }
        if (has2) {
            const s2 = niceStep(z1 - z0, Math.max(3, ph / 40));
            ctx.textAlign = 'left'; ctx.fillStyle = this.opt.y2Color || '#7a5c99';
            for (let v = Math.ceil(z0 / s2) * s2; v <= z1 + 1e-9; v += s2) ctx.fillText(fmtTick(v, s2), px0 + pw + 6, Math.round(Y2(v)) + 0.5);
            ctx.save(); ctx.translate(w - 10, py0 + ph / 2); ctx.rotate(Math.PI / 2); ctx.textAlign = 'center';
            ctx.fillText(this.opt.y2Label, 0, 0); ctx.restore();
        }
        ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(this.opt.xLabel, px0 + pw / 2, h - 3);
        ctx.save(); ctx.translate(12, py0 + ph / 2); ctx.rotate(-Math.PI / 2); ctx.textBaseline = 'middle';
        ctx.fillText(this.opt.yLabel, 0, 0); ctx.restore();
        ctx.strokeStyle = '#8a98a8'; ctx.strokeRect(px0 + 0.5, py0 + 0.5, pw, ph);

        // traces
        ctx.save(); ctx.beginPath(); ctx.rect(px0, py0, pw, ph); ctx.clip();
        for (const s of this.series) {
            const n = s.x.length;
            if (!n) continue;
            const yy = s.axis === 2 ? Y2 : Y;
            ctx.strokeStyle = s.color; ctx.lineWidth = s.width || 1.4; ctx.lineJoin = 'round';
            ctx.beginPath();
            let i0 = 0, i1 = n - 1;
            while (i0 < n - 1 && s.x[i0 + 1] < x0) i0++;
            while (i1 > 0 && s.x[i1 - 1] > x1) i1--;
            const count = i1 - i0 + 1;
            if (count > 3 * pw) {
                // min/max per pixel column
                let col = -1, lo = 0, hi = 0, first = true;
                for (let i = i0; i <= i1; i++) {
                    const c = Math.floor(X(s.x[i])), y = s.y[i];
                    if (c !== col) {
                        if (col >= 0) { ctx.lineTo(col, yy(lo)); ctx.lineTo(col, yy(hi)); }
                        col = c; lo = hi = y;
                        if (first) { ctx.moveTo(c, yy(y)); first = false; }
                    } else { if (y < lo) lo = y; if (y > hi) hi = y; }
                }
                ctx.lineTo(col, yy(lo)); ctx.lineTo(col, yy(hi));
            } else {
                for (let i = i0; i <= i1; i++) {
                    const a = X(s.x[i]), b = yy(s.y[i]);
                    if (i === i0) ctx.moveTo(a, b); else ctx.lineTo(a, b);
                }
            }
            ctx.stroke();
        }
        // integration marks
        ctx.font = '10px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        for (const p of this.peaks) {
            ctx.strokeStyle = '#d0672a'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(X(p.tStart), Y(p.baseStart)); ctx.lineTo(X(p.tEnd), Y(p.baseEnd)); ctx.stroke();
            for (const [tt, bb] of [[p.tStart, p.baseStart], [p.tEnd, p.baseEnd]]) {
                ctx.beginPath(); ctx.moveTo(X(tt), Y(bb) - 5); ctx.lineTo(X(tt), Y(bb) + 5); ctx.stroke();
            }
            const ax = X(p.rt), ay = Y(p.height + p.baseStart + (p.baseEnd - p.baseStart) * (p.rt - p.tStart) / Math.max(1e-9, p.tEnd - p.tStart));
            ctx.save(); ctx.translate(ax, Math.max(py0 + 34, ay - 5)); ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = ink; ctx.fillText(p.rt.toFixed(3), 0, 0); ctx.restore();
        }
        if (this.marker !== null) {
            ctx.strokeStyle = '#8e44ad'; ctx.setLineDash([4, 3]);
            ctx.beginPath(); ctx.moveTo(X(this.marker), py0); ctx.lineTo(X(this.marker), py0 + ph); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.restore();
        // legend
        let lx = px0 + 8;
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = '11px system-ui, sans-serif';
        for (const s of this.series) {
            if (!s.label) continue;
            ctx.strokeStyle = s.color; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(lx, py0 + 10); ctx.lineTo(lx + 14, py0 + 10); ctx.stroke();
            ctx.fillStyle = ink; ctx.fillText(s.label, lx + 18, py0 + 10);
            lx += 26 + ctx.measureText(s.label).width;
            if (lx > px0 + pw - 60) break;
        }
        if (this.drag) {
            const d = this.drag;
            ctx.fillStyle = 'rgba(42,120,194,0.15)'; ctx.strokeStyle = '#2a78c2';
            ctx.fillRect(d.x0, d.y0, d.x1 - d.x0, d.y1 - d.y0); ctx.strokeRect(d.x0 + 0.5, d.y0 + 0.5, d.x1 - d.x0, d.y1 - d.y0);
        }
    }
}
