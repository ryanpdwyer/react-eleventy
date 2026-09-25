/**
 * Voltammetry Simulation – Molecular View
 *
 * A schematic particle picture of the solution next to the electrode.
 * Each dot random-walks with its species' diffusion coefficient. When a
 * dot hits the electrode it may take or give an electron, with a
 * probability set by the Butler-Volmer rate constants:
 *
 *   P(react per hit) = min(1, (kc + ka)·√(πΔt/D)),  then R with odds kc : ka
 *
 * For slow kinetics this reduces to the Robin boundary k·√(πΔt/D)
 * (Erban & Chapman, Phys. Biol. 2007, 4, 16); for fast kinetics the
 * surface settles at the Nernst ratio. The dots are qualitative: the
 * plotted numbers come from the finite-difference engine, and the
 * two agree on average.
 *
 * To keep the picture readable:
 *  - dots glide in straight lines between keyframes of their true
 *    random walk (every KEY_MS), so the drift shows but the frame-to-frame
 *    jitter doesn't; positions are exact at each keyframe, so nothing is
 *    biased away from the walls;
 *  - only x is physical (the model is 1-D); the vertical wander is
 *    damped so motion reads as toward/away from the electrode;
 *  - electrons are drawn for the NET current only (rate ∝ |I|), each
 *    attached to a molecule that just reacted in that direction, so the
 *    back-and-forth exchange near E⁰ doesn't flood the view.
 *
 * With two redox couples, shape marks the couple (circle = 1, square = 2)
 * and colour/fill still mark the oxidation state. Dots are shared out in
 * proportion to each couple's total concentration.
 */

import { rateConstants } from './cv-sim-engine.js';

export const COLOR_O = '#1c7ed6';
export const COLOR_R = '#f76707';
const COLOR_E = '#fcc419';

const MAX_SPRITES = 8;       // electrons in flight at once
const SPRITE_MS = 750;       // flight time of one electron
const E_RATE = 8;            // electrons drawn per second at full-scale current
const KEY_MS = 150;          // dots glide between true positions sampled this often
const Y_WANDER = 0.35;       // vertical (decorative) step relative to the physical one
const DOT_R = 4.2;
const MAX_SUBSTEPS = 400;

export function createParticleView(canvas) {
    const ctx = canvas.getContext('2d');
    let P = null;              // physics params
    let parts = [];            // { c (couple), R, x, y (µm, true), ax, ay → bx, by (drawn keyframes) }
    let sprites = [];          // electron animations
    let recent = [];           // per couple: { red: [], ox: [] } molecules that just reacted
    let eBudget = [];          // per couple: electrons owed to the drawing
    let lastDraw = 0, keyT = -Infinity;
    let clock = 0, frozen = false;   // animation time (ms); stands still while paused
    let W = 0, H = 0, plotL = 56, plotW = 100;
    let Ynm = 1;               // strip height in µm (isotropic with x)
    let lastE = 0, lastIk = [0], Iscale = 1;

    // Canvas sizing: match CSS width, sharp on hi-dpi screens
    function resize(plotSize) {
        const dpr = window.devicePixelRatio || 1;
        W = canvas.clientWidth;
        H = canvas.clientHeight;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (plotSize) { plotL = plotSize.l; plotW = plotSize.w; }
        if (P) Ynm = P.xm * H / plotW;
    }

    /**
     * params: { xm, Do, Dr, alpha, n, couples: [{ E0, k0, Co0, Cr0 }], Estart, Iscale }
     */
    function reset(params) {
        P = params;
        Ynm = P.xm * H / plotW;
        const N = Math.round(Math.min(220, Math.max(120, plotW * H / 900)));
        const tot = P.couples.map(c => c.Co0 + c.Cr0);
        const sum = tot.reduce((a, b) => a + b, 0) || 1;
        parts = [];
        P.couples.forEach((cp, c) => {
            const Nc = Math.round(N * tot[c] / sum);
            const fR = tot[c] > 0 ? cp.Cr0 / tot[c] : 0;
            for (let i = 0; i < Nc; i++) {
                const x = Math.random() * P.xm, y = Math.random() * Ynm;
                parts.push({ c, R: Math.random() < fR, x, y, ax: x, ay: y, bx: x, by: y });
            }
        });
        sprites = [];
        recent = P.couples.map(() => ({ red: [], ox: [] }));
        eBudget = P.couples.map(() => 0);
        keyT = -Infinity;
        lastIk = P.couples.map(() => 0);
        lastE = P.Estart;
        Iscale = P.Iscale || Infinity;   // no arrow until a run sets the scale
    }

    function gauss() {
        const u = 1 - Math.random(), v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    /**
     * Advance the dots by dtSim seconds of simulated time at potential E.
     * fOfar[c]: fraction of couple c that is O at the right edge (from the
     * FD profile), used to set the identity of dots that wander back in.
     */
    function advance(dtSim, E, fOfar) {
        if (!P || dtSim <= 0) return;
        lastE = E;
        const Dmax = Math.max(P.Do, P.Dr) * 1e8;           // cm²/s → µm²/s
        const sigTarget = 0.015 * P.xm;                     // µm per substep
        const nsub = Math.min(MAX_SUBSTEPS,
            Math.max(1, Math.ceil(2 * Dmax * dtSim / (sigTarget * sigTarget))));
        const h = dtSim / nsub;
        const sO = Math.sqrt(2 * P.Do * 1e8 * h), sR = Math.sqrt(2 * P.Dr * 1e8 * h);
        const kin = P.couples.map(cp => {
            const { kc, ka } = rateConstants(E, { ...P, ...cp });
            // √(πΔt/D) in s/cm, per species
            return { pR: kc / (kc + ka),
                     qO: Math.min(1, (kc + ka) * Math.sqrt(Math.PI * h / P.Do)),
                     qR: Math.min(1, (kc + ka) * Math.sqrt(Math.PI * h / P.Dr)) };
        });

        for (let s = 0; s < nsub; s++) {
            for (const d of parts) {
                const sig = d.R ? sR : sO;
                d.x += sig * gauss();
                d.y += Y_WANDER * sig * gauss();
                if (d.y < 0) d.y = -d.y;
                if (d.y > Ynm) d.y = 2 * Ynm - d.y;
                if (d.x > P.xm) {
                    d.x = 2 * P.xm - d.x;
                    d.R = Math.random() > fOfar[d.c];
                }
                if (d.x < 0) {
                    d.x = -d.x;
                    const k = kin[d.c];
                    if (Math.random() < (d.R ? k.qR : k.qO)) {
                        const wasR = d.R;
                        d.R = Math.random() < k.pR;
                        if (d.R !== wasR) remember(d);
                    }
                }
            }
        }
    }

    function remember(d) {
        const list = d.R ? recent[d.c].red : recent[d.c].ox;
        list.push(d);
        if (list.length > 12) list.shift();
    }

    // Electrons for the net current of each couple: into a just-reduced
    // molecule, or out of a just-oxidized one. Rate ∝ |I|, so they read as
    // the current.
    function emitElectrons(now, dtReal) {
        lastIk.forEach((I, c) => {
            const frac = Math.min(1, Math.abs(I) / Iscale);
            eBudget[c] = Math.min(1.5, eBudget[c] + E_RATE * frac * dtReal / 1000);
            const list = I > 0 ? recent[c].red : recent[c].ox;
            while (eBudget[c] >= 1 && list.length && sprites.length < MAX_SPRITES) {
                const d = list.pop();
                if (d.R !== (I > 0)) continue;           // it has since flipped back
                sprites.push({ d, reduced: d.R, t0: now });
                if (d.R) d.holdUntil = now + 0.8 * SPRITE_MS;   // stays O until its electron lands
                eBudget[c] -= 1;
            }
        });
    }

    // Faradaic current of each couple (A)
    function setCurrent(Ik) { lastIk = Ik; }

    const toPx = x => plotL + (x / P.xm) * plotW;
    const toPy = y => (y / Ynm) * H;

    function draw(wall) {
        ctx.clearRect(0, 0, W, H);
        if (!P) return;
        const dtReal = frozen ? 0 : lastDraw ? Math.min(100, wall - lastDraw) : 16;
        lastDraw = wall;
        clock += dtReal;
        const now = clock;
        emitElectrons(now, dtReal);

        // Solution
        ctx.fillStyle = '#f4f8fc';
        ctx.fillRect(plotL, 0, plotW, H);

        // Electrode (metal slab) with a faint electron sea
        const g = ctx.createLinearGradient(0, 0, plotL, 0);
        g.addColorStop(0, '#adb5bd');
        g.addColorStop(1, '#dee2e6');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, plotL, H);
        ctx.fillStyle = 'rgba(73,80,87,0.25)';
        for (let i = 0; i < 18; i++) {
            const ex = ((i * 37) % 97) / 97 * (plotL - 14) + 5;
            const ey = ((i * 53) % 89) / 89 * (H - 10) + 5;
            ctx.beginPath(); ctx.arc(ex, ey, 1.6, 0, 2 * Math.PI); ctx.fill();
        }
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(plotL, 0); ctx.lineTo(plotL, H); ctx.stroke();

        // Net electron flow arrow in the electrode, length ∝ |I|
        const lastI = lastIk.reduce((a, b) => a + b, 0);
        const frac = Math.min(1, Math.abs(lastI) / Iscale);
        if (frac > 0.02) {
            const cy = H - 16, len = 8 + frac * (plotL - 18);
            const dir = lastI > 0 ? 1 : -1;               // reduction: electrons into solution
            const x0 = dir > 0 ? 4 : 4 + len, x1 = dir > 0 ? 4 + len : 4;
            ctx.strokeStyle = '#343a40'; ctx.fillStyle = '#343a40'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x1, cy); ctx.lineTo(x1 - 6 * dir, cy - 4); ctx.lineTo(x1 - 6 * dir, cy + 4);
            ctx.fill();
            ctx.font = '10px system-ui, sans-serif';
            ctx.fillText('e⁻', Math.min(x0, x1) + len / 2 - 5, cy - 6);
        }
        ctx.fillStyle = '#212529';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillText(`${lastE >= 0 ? '+' : '−'}${Math.abs(lastE).toFixed(2)} V`, 4, 14);

        // Molecules: O hollow (missing the electron), R filled
        // New keyframe only while something is still moving, so the view can come to rest
        const moving = parts.some(d => d.bx !== d.x || d.by !== d.y || d.ax !== d.bx || d.ay !== d.by);
        if (now - keyT >= KEY_MS && moving) {
            keyT = now;
            for (const d of parts) {
                d.ax = d.bx; d.ay = d.by;
                d.bx = d.x;  d.by = d.y;
            }
        }
        const u = Math.min(1, (now - keyT) / KEY_MS);
        for (const d of parts) {
            d.sx = d.ax + (d.bx - d.ax) * u;
            d.sy = d.ay + (d.by - d.ay) * u;
        }

        ctx.lineWidth = 1.8;
        const sq = 0.85 * DOT_R;
        for (const d of parts) {
            const px = toPx(d.sx), py = toPy(d.sy);
            ctx.beginPath();
            if (d.c === 0) ctx.arc(px, py, DOT_R, 0, 2 * Math.PI);
            else ctx.rect(px - sq, py - sq, 2 * sq, 2 * sq);
            if (d.R && !(d.holdUntil > now)) { ctx.fillStyle = COLOR_R; ctx.fill(); }
            else { ctx.strokeStyle = COLOR_O; ctx.stroke(); }
        }

        // Electrons in flight
        sprites = sprites.filter(s => now - s.t0 < SPRITE_MS);
        for (const s of sprites) {
            const u = (now - s.t0) / SPRITE_MS;
            if (u < 0) continue;
            const e = u * u * (3 - 2 * u);                   // smoothstep
            const inside = 0.35 * plotL, mol = toPx(s.d.sx), my = toPy(s.d.sy);
            const [x0, y0, x1, y1] = s.reduced ? [inside, my, mol, my] : [mol, my, inside, my];
            const px = x0 + (x1 - x0) * e, py = y0 + (y1 - y0) * e;
            ctx.globalAlpha = u < 0.85 ? 1 : (1 - u) / 0.15;
            ctx.fillStyle = COLOR_E; ctx.strokeStyle = '#5c4400'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(px, py, 3, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    // Still animating: electrons in flight or dots gliding to rest
    const busy = () => !frozen && (sprites.some(s => clock - s.t0 < SPRITE_MS) ||
        clock - keyT < KEY_MS || parts.some(d => d.bx !== d.x || d.ax !== d.bx));

    // Paused: electrons and dots hold still until released
    function setFrozen(v) {
        frozen = v;
        if (!v) lastDraw = 0;
    }

    return { resize, reset, advance, draw, setCurrent, busy, setFrozen };
}
