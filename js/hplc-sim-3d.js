/**
 * HPLC simulator: 3D view of the instrument stack
 *
 * A three.js scene of the stack as it sits on the bench: solvent bottles on
 * top, then pump, vialsampler, column compartment and detector, with a waste
 * bottle beside it. It is a view of the Instrument state, not a second model:
 * the inlet lines are coloured from the actual line contents (white = air,
 * otherwise the colour of whatever solvent is in that part of the tube), the
 * purge knob is the purge valve, and the moving beads show where the pump's
 * output is really going (to waste, or through the column).
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { W, M, A, AIR, NC } from './hplc-sim-chem.js';

const CH = ['A', 'B', 'C', 'D'];
const STATUS = { off: 0x98a4b1, ready: 0x2e9e5b, notready: 0xe0a100, run: 0x2a78c2, error: 0xd64541 };
const COL = { air: new THREE.Color(0xffffff), water: new THREE.Color(0x7cc4f0), meoh: new THREE.Color(0xf2c24e), acn: new THREE.Color(0xf08a4b), buffer: new THREE.Color(0x6fcf7f) };

function vecColor(v) {
    if (v[AIR] > 0.5) return COL.air;
    if (v[M] > 0.5) return COL.meoh;
    if (v[A] > 0.5) return COL.acn;
    for (let i = 3; i < NC - 1; i++) if (v[i] !== 0) return COL.buffer;
    return COL.water;
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function createStack3D(inst, hooks = {}) {
    const el = document.createElement('div');
    el.style.cssText = 'position:relative;width:100%;height:100%;min-height:420px;border-radius:8px;overflow:hidden;background:linear-gradient(#dfe8f1,#f4f7fa)';
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    el.append(renderer.domElement);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    const labels = document.createElement('div');
    labels.style.cssText = 'position:absolute;inset:0;pointer-events:none;font:11px system-ui,sans-serif';
    el.append(labels);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(6.5, 8.6, 15.5);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-0.5, 4.3, 0.6);
    controls.enablePan = false; controls.minDistance = 7; controls.maxDistance = 26;
    controls.maxPolarAngle = Math.PI * 0.52; controls.minAzimuthAngle = -1.2; controls.maxAzimuthAngle = 1.2;
    controls.update();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8894a0, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(5, 12, 9); scene.add(sun);

    const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...o });
    const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    const cyl = (r, h, m, seg = 28) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m);
    const add = (mesh, x, y, z, parent = scene) => { mesh.position.set(x, y, z); parent.add(mesh); return mesh; };

    // bench
    add(box(16, 0.2, 9, mat(0x3c4a57, { roughness: 0.9 })), -0.8, -0.1, 0.6);

    // ---- modules, bottom to top
    const WD = 4.4, DP = 4.0, FZ = DP / 2;
    const body = mat(0xe9edf1), front = mat(0xcfd6de), dark = mat(0x2b3642), steel = mat(0xb9c2cc, { metalness: 0.7, roughness: 0.3 });
    const mods = {};
    const mkModule = (name, y0, hgt) => {
        add(box(WD, hgt - 0.04, DP, body), 0, y0 + hgt / 2, 0);
        add(box(WD - 0.3, hgt - 0.3, 0.06, front), 0, y0 + hgt / 2, FZ + 0.02);
        const led = add(box(0.9, 0.09, 0.05, new THREE.MeshBasicMaterial({ color: STATUS.off })), -WD / 2 + 0.75, y0 + hgt - 0.2, FZ + 0.07);
        mods[name] = { y0, hgt, led };
    };
    mkModule('dad', 0, 1.4); mkModule('tcc', 1.4, 1.6); mkModule('sampler', 3.0, 2.0); mkModule('pump', 5.0, 1.4);

    // solvent cabinet and bottles
    add(box(WD, 0.12, DP, body), 0, 6.46, 0);
    for (const [x, z, w, d] of [[0, FZ - 0.05, WD, 0.1], [0, -FZ + 0.05, WD, 0.1], [-WD / 2 + 0.05, 0, 0.1, DP], [WD / 2 - 0.05, 0, 0.1, DP]]) add(box(w, 0.5, d, body), x, 6.7, z);
    const glass = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, roughness: 0.1, depthWrite: false });
    const bottles = [];
    const BX = [-1.5, -0.5, 0.5, 1.5], BY = 6.52, BH = 1.7, BR = 0.42, BZ = 0.5;
    for (let i = 0; i < 4; i++) {
        const liquid = add(cyl(BR - 0.04, 1, new THREE.MeshStandardMaterial({ color: 0x7cc4f0, transparent: true, opacity: 0.85, roughness: 0.2 })), BX[i], BY, BZ);
        add(cyl(BR, BH, glass), BX[i], BY + BH / 2, BZ).renderOrder = 2;
        add(cyl(0.2, 0.22, dark), BX[i], BY + BH + 0.11, BZ);
        add(cyl(0.02, BH, mat(0xffffff, { transparent: true, opacity: 0.7 }), 6), BX[i], BY + BH / 2 + 0.05, BZ);   // dip tube
        add(cyl(0.06, 0.1, steel, 10), BX[i], BY + 0.1, BZ);                                                         // inlet filter
        bottles.push({ liquid });
    }

    // pump front: channel inlet block, pump head, purge valve
    const PY = 5.0;
    add(box(1.1, 0.5, 0.25, dark), 1.25, PY + 0.75, FZ + 0.15);
    add(cyl(0.3, 0.5, steel), 0.0, PY + 0.7, FZ + 0.25).rotation.x = Math.PI / 2;
    add(box(0.75, 0.75, 0.3, steel), -1.1, PY + 0.62, FZ + 0.17);
    const knob = new THREE.Group();
    const knobBody = cyl(0.27, 0.34, mat(0x1b232c, { roughness: 0.4 }), 12);
    knobBody.rotation.x = Math.PI / 2; knob.add(knobBody);
    const mark = box(0.07, 0.24, 0.05, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    mark.position.set(0, 0.13, 0.19); knob.add(mark);
    knob.position.set(-1.1, PY + 0.62, FZ + 0.48); scene.add(knob);
    knobBody.userData.pick = 'knob'; mark.userData.pick = 'knob';

    // sampler: window and tray
    const SY = 3.0;
    add(box(3.3, 1.25, 0.05, new THREE.MeshStandardMaterial({ color: 0x1d2a36, transparent: true, opacity: 0.35, depthWrite: false })), 0.35, SY + 1.0, FZ + 0.06).renderOrder = 2;
    add(box(3.2, 0.08, 1.5, mat(0x55626f)), 0.35, SY + 0.55, FZ - 0.85);
    const vialGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.34, 10);
    const vialMat = mat(0x7fb8e6, { transparent: true, opacity: 0.9 });
    const vials = new THREE.InstancedMesh(vialGeo, vialMat, 66);
    vials.count = 0; scene.add(vials);
    let vialKey = '';

    // column compartment: door window and the column
    const TY = 1.4;
    add(box(3.3, 0.95, 0.05, new THREE.MeshStandardMaterial({ color: 0x1d2a36, transparent: true, opacity: 0.3, depthWrite: false })), 0.35, TY + 0.8, FZ + 0.06).renderOrder = 2;
    const column = add(cyl(0.11, 1, steel, 16), 0.35, TY + 0.8, FZ - 0.25);
    column.rotation.z = Math.PI / 2;
    const heater = add(box(3.1, 0.7, 0.05, mat(0x8b3a2a, { emissive: 0xff5a2a, emissiveIntensity: 0 })), 0.35, TY + 0.8, FZ - 0.5);

    // detector lamp window
    const lamp = add(cyl(0.16, 0.06, new THREE.MeshBasicMaterial({ color: 0x3a3350 }), 20), 1.2, 0.7, FZ + 0.07);
    lamp.rotation.x = Math.PI / 2;

    // waste bottle
    const WX = -4.6, WZ = 2.2;
    const wasteLiq = add(cyl(0.72, 1, new THREE.MeshStandardMaterial({ color: 0xb9b08f, transparent: true, opacity: 0.85 })), WX, 0, WZ);
    add(cyl(0.78, 2.1, glass), WX, 1.05, WZ).renderOrder = 2;
    add(cyl(0.3, 0.25, dark), WX, 2.22, WZ);

    // ---- tubing
    const lines = [];
    const SEG = 44, RAD = 7;
    for (let i = 0; i < 4; i++) {
        const px = 0.92 + 0.22 * i;
        const curve = new THREE.CatmullRomCurve3([
            V(BX[i], BY + BH + 0.2, BZ), V(BX[i], BY + BH + 0.75, BZ + 0.5), V(BX[i] * 0.75 + 0.45, BY + BH + 0.55, FZ + 0.25),
            V(px + 0.1, 6.75, FZ + 0.62), V(px, 6.2, FZ + 0.5), V(px, PY + 0.95, FZ + 0.28),
        ]);
        const geo = new THREE.TubeGeometry(curve, SEG, 0.055, RAD - 1, false);
        const colors = new Float32Array((SEG + 1) * RAD * 3);
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, emissive: 0x222222 })));
        lines.push({ geo, colors, curve });
    }
    const tubeMesh = (pts, r, color) => {
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.25);
        const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, r, 6, false), mat(color, { roughness: 0.35 }));
        scene.add(m);
        return curve;
    };
    const LX = -WD / 2 - 0.12;
    const purgePath = tubeMesh([V(-1.1, PY + 0.3, FZ + 0.3), V(-1.4, PY - 0.1, FZ + 0.55), V(LX - 0.3, 4.2, FZ + 0.5), V(LX - 0.9, 3.0, FZ + 0.3), V(WX + 0.15, 2.7, WZ), V(WX + 0.1, 2.3, WZ)], 0.05, 0xdfe6ec);
    const colPath = tubeMesh([V(-0.05, PY + 0.45, FZ + 0.42), V(-0.45, PY + 0.1, FZ + 0.3), V(-0.5, SY + 1.5, FZ + 0.16), V(-0.5, SY + 0.6, FZ + 0.16),
    V(-1.2, TY + 1.2, FZ + 0.16), V(-1.0, TY + 0.8, FZ + 0.14), V(1.6, TY + 0.55, FZ + 0.14), V(1.3, 1.1, FZ + 0.14), V(0.9, 0.5, FZ + 0.14),
    V(-1.9, 0.35, FZ + 0.2), V(LX - 0.9, 1.6, FZ + 0.4), V(WX - 0.1, 2.75, WZ), V(WX - 0.1, 2.3, WZ)], 0.03, 0x4f9a6a);
    const beadGeo = new THREE.SphereGeometry(0.085, 10, 8);
    const mkBeads = (n, color) => Array.from({ length: n }, (_, k) => { const b = new THREE.Mesh(beadGeo, new THREE.MeshBasicMaterial({ color })); b.visible = false; scene.add(b); return { mesh: b, u: k / n }; });
    const purgeBeads = mkBeads(7, 0x1f8fe0), colBeads = mkBeads(14, 0x18a558);

    // ---- highlight ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.045, 8, 48), new THREE.MeshBasicMaterial({ color: 0xf0b429, depthTest: false, transparent: true }));
    ring.renderOrder = 10; ring.visible = false; scene.add(ring);
    const targets = {
        knob: [knob.position, 0.55], bottles: [V(0, BY + 1.0, BZ), 2.5], pump: [V(0.2, PY + 0.7, FZ + 0.2), 1.3],
        sampler: [V(0.35, SY + 1.0, FZ), 1.5], tcc: [V(0.35, TY + 0.8, FZ), 1.3], dad: [V(1.2, 0.7, FZ), 0.5], waste: [V(WX, 1.4, WZ), 1.3],
    };
    for (let i = 0; i < 4; i++) {
        targets['line' + i] = [lines[i].curve.getPoint(0.55), 0.6];
        targets['bottle' + i] = [V(BX[i], BY + 0.95, BZ), 0.95];
    }
    let highlight = null;

    // ---- labels
    const mkLabel = (pos, cls) => {
        const d = document.createElement('div');
        d.style.cssText = 'position:absolute;transform:translate(-50%,-50%);white-space:nowrap;padding:2px 7px;border-radius:99px;background:rgba(255,255,255,.88);border:1px solid #c3ced9;color:#1f2d3d;font-weight:600';
        if (cls) d.style.cssText += cls;
        labels.append(d);
        return { el: d, pos };
    };
    const L = {
        bottle: BX.map((x, i) => mkLabel(V(x, BY + BH + 1.15, BZ + 0.3))),
        pump: mkLabel(V(0.55, PY + 0.25, FZ + 0.3)),
        knob: mkLabel(V(-1.1, PY + 1.12, FZ + 0.5), ';background:#22313f;color:#fff;border-color:#22313f'),
        sampler: mkLabel(V(0.35, SY + 0.28, FZ + 0.1)),
        tcc: mkLabel(V(0.35, TY + 0.22, FZ + 0.1)),
        dad: mkLabel(V(-0.1, 0.7, FZ + 0.1)),
        waste: mkLabel(V(WX, 2.75, WZ)),
    };

    // ---- picking
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
    let down = null;
    const pickAt = ev => {
        const r = renderer.domElement.getBoundingClientRect();
        ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ptr, camera);
        const hit = ray.intersectObjects(knob.children, false)[0];
        return hit ? hit.object.userData.pick : null;
    };
    renderer.domElement.addEventListener('pointerdown', ev => { down = { x: ev.clientX, y: ev.clientY }; });
    renderer.domElement.addEventListener('pointerup', ev => {
        if (!down || Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) return;
        if (pickAt(ev) === 'knob' && hooks.onKnob) hooks.onKnob();
    });
    renderer.domElement.addEventListener('pointermove', ev => { renderer.domElement.style.cursor = pickAt(ev) === 'knob' ? 'pointer' : 'grab'; });

    const tmp = new THREE.Vector3(), m4 = new THREE.Matrix4();
    let clock = 0, size = '';

    function sync(dt) {
        clock += dt;
        const P = inst.pump, st = inst.moduleStatus();
        for (const k of ['pump', 'sampler', 'tcc', 'dad']) mods[k].led.material.color.setHex(STATUS[st[k]]);

        // bottles and inlet lines
        inst.bottles.forEach((b, i) => {
            const f = Math.max(0.001, b.vol / b.cap), liq = bottles[i].liquid;
            liq.scale.y = f * (BH - 0.25); liq.position.y = BY + 0.03 + liq.scale.y / 2;
            liq.material.color.copy(vecColor(b.solvent.vec));
            L.bottle[i].el.textContent = `${CH[i]} · ${b.solvent.short}`;
            // colour the tube from the line contents; ring 0 is the bottle end, the last ring the pump end
            const line = inst.lines[i], ln = lines[i];
            let total = 0;
            for (const s of line) total += s.vol;
            let si = line.length - 1, acc = 0;            // walk from the bottle end
            for (let j = 0; j <= SEG; j++) {
                const pos = (j / SEG) * total;
                while (si > 0 && acc + line[si].vol < pos) { acc += line[si].vol; si--; }
                const seg = line[si];
                let c = seg ? vecColor(seg.vec) : COL.air;
                let dim = 1;
                if (c === COL.air) dim = ((j + Math.floor(clock * 3 * Math.min(1, P.flow))) % 3 === 0) ? 0.72 : 1;   // bubbles
                for (let r = 0; r < RAD; r++) {
                    const o = (j * RAD + r) * 3;
                    ln.colors[o] = c.r * dim; ln.colors[o + 1] = c.g * dim; ln.colors[o + 2] = c.b * dim;
                }
            }
            ln.geo.attributes.color.needsUpdate = true;
        });

        // purge valve
        const want = P.purgeOpen ? Math.PI * 1.5 : 0;
        knob.rotation.z += (want - knob.rotation.z) * Math.min(1, dt * 7);
        L.knob.el.textContent = P.purgeOpen ? 'Purge valve OPEN → waste' : 'Purge valve closed';
        L.knob.el.style.background = P.purgeOpen ? '#d18a00' : '#22313f';

        // where the flow goes
        const toWaste = P.purgeOpen ? P.flow : 0, toCol = P.purgeOpen ? 0 : P.flowEff;
        const move = (beads, path, flow, scale) => {
            for (const b of beads) {
                b.mesh.visible = flow > 0.02;
                if (!b.mesh.visible) continue;
                b.u = (b.u + dt * flow * scale) % 1;
                path.getPoint(b.u, b.mesh.position);
            }
        };
        move(purgeBeads, purgePath, toWaste, 0.09);
        move(colBeads, colPath, toCol, 0.16);

        // vials
        const pos = Object.keys(inst.sampler.vials), key = pos.join();
        if (key !== vialKey) {
            vialKey = key; vials.count = pos.length;
            pos.forEach((p, n) => {
                const r = p.charCodeAt(3) - 65, c = +p.slice(4) - 1;
                m4.makeTranslation(0.35 - 1.4 + c * 0.28, SY + 0.76, FZ - 0.25 - r * 0.22);
                vials.setMatrixAt(n, m4);
            });
            vials.instanceMatrix.needsUpdate = true;
        }

        // column, heater, lamp, waste
        const col = inst.column.type;
        column.scale.y = 0.6 + col.L / 100; column.scale.x = column.scale.z = col.dc / 4.6;
        heater.material.emissiveIntensity = inst.tcc.on ? Math.min(0.8, Math.max(0, (inst.tcc.temp - 22) / 40)) : 0;
        const on = inst.dad.lamp === 'on', ign = inst.dad.lamp === 'igniting';
        lamp.material.color.setHex(on ? 0xb48cff : ign ? (Math.sin(clock * 18) > 0 ? 0xb48cff : 0x3a3350) : 0x3a3350);
        const wf = Math.min(1, inst.waste / 2000);
        wasteLiq.scale.y = Math.max(0.02, wf * 1.9); wasteLiq.position.y = wasteLiq.scale.y / 2 + 0.02;

        L.pump.el.textContent = `Pump ${P.power} · ${P.flow.toFixed(2)} mL/min · ${P.pShown.toFixed(0)} bar`;
        L.sampler.el.textContent = `Vialsampler · ${pos.length} vial(s)`;
        L.tcc.el.textContent = `Column ${inst.tcc.temp.toFixed(1)} °C${inst.tcc.on ? '' : ' (off)'}`;
        L.dad.el.textContent = `DAD · lamp ${inst.dad.lamp}`;
        L.waste.el.textContent = `Waste ${inst.waste.toFixed(0)} mL`;

        // highlight
        const t = highlight && targets[highlight];
        ring.visible = !!t;
        if (t) {
            ring.position.copy(t[0]); ring.quaternion.copy(camera.quaternion);
            ring.scale.setScalar(t[1] * (1 + 0.07 * Math.sin(clock * 5)));
            ring.material.opacity = 0.65 + 0.35 * Math.sin(clock * 5);
        }
    }

    function update(dt) {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        if (size !== w + 'x' + h) {
            size = w + 'x' + h;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.fov = w / h < 1 ? 50 : 36;
            camera.updateProjectionMatrix();
        }
        sync(dt);
        controls.update();
        renderer.render(scene, camera);
        const place = lb => {
            tmp.copy(lb.pos).project(camera);
            lb.el.style.display = tmp.z > 1 ? 'none' : '';
            lb.el.style.left = ((tmp.x + 1) / 2 * w) + 'px'; lb.el.style.top = ((1 - tmp.y) / 2 * h) + 'px';
        };
        for (const k in L) Array.isArray(L[k]) ? L[k].forEach(place) : place(L[k]);
    }

    /** Screen position (px, relative to the view) of a named part */
    function screenPos(name) {
        tmp.copy(targets[name][0]).project(camera);
        return { x: (tmp.x + 1) / 2 * el.clientWidth, y: (1 - tmp.y) / 2 * el.clientHeight };
    }

    return { el, update, screenPos, setHighlight(name) { highlight = name; } };
}
