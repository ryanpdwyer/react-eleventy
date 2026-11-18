// Headless checks of the HPLC simulator model: node tools/hplc-sim-check.mjs
// Prints retention time (height, plates, tailing, area) per peak for a set of normal and failure scenarios.
import * as chem from '../js/hplc-sim-chem.js';
import { Instrument, defaultMethod } from '../js/hplc-sim-engine.js';
import { buildStockroom, vialOf } from '../js/hplc-sim-samples.js';
import { integrate, defaultIntegration } from '../js/hplc-sim-analysis.js';
const stock = buildStockroom(); const sol = id => stock.find(s => s.id === id);
function ready(bottles, mod, colId) {
  const inst = new Instrument();
  if (colId) inst.installColumn(colId);
  bottles.forEach((b,i)=>{ if (b) inst.setBottle(i,b); });
  inst.setPurge(true); const m = defaultMethod(); m.pump.flow=5; inst.pumpPower('on');
  for (const [b,c,d] of [[0,0,0],[100,0,0],[0,100,0],[0,0,100]]) { m.pump.B=b;m.pump.C=c;m.pump.D=d; inst.applyMethod(m); inst.advance(90); }
  const m2 = defaultMethod(); mod(m2); inst.applyMethod(m2); inst.advance(10); inst.setPurge(false); inst.lampPower(true); inst.tccPower(true); inst.advance(1500);
  return inst;
}
function run(inst, solution, mod, opts={}) {
  if (solution) inst.placeVial('P1-A1', vialOf(solution));
  if (mod) { const m = JSON.parse(JSON.stringify(inst.method)); mod(m); inst.applyMethod(m); inst.advance(opts.wait ?? 900); }
  inst.startRun({pos:'P1-A1', blank: !solution}); let g=0; while(inst.run && g++<8000) inst.advance(1);
  if (inst.run) return 'STUCK ' + inst.run.state + ' ' + inst.notReady() + ' ' + JSON.stringify(inst.error);
  const f = inst.files[inst.files.length-1];
  const res = integrate(f.t, f.sig[0], defaultIntegration());
  let mn=1e9,mx=-1e9; for (const y of f.sig[0]) { if(y<mn)mn=y; if(y>mx)mx=y; }
  return res.peaks.map(p=>`${p.rt.toFixed(2)}(${p.height.toFixed(1)}mAU,N${p.plates?p.plates.toFixed(0):'-'},T${p.tailing?p.tailing.toFixed(2):'-'},A${p.area.toFixed(1)})`).join('  ') + `  | P=${inst.pump.pShown.toFixed(0)} range ${mn.toFixed(2)}..${mx.toFixed(2)}`;
}
let inst = ready([], m=>{m.pump.B=60; m.pump.stopTime=6; m.sampler.injVol=2; m.pump.pmax=600; m.dad.pw=0}, 'ps50');
console.log('poroshell parabens', run(inst, sol('parabens')));
inst = ready([], m=>{m.pump.B=60; m.pump.stopTime=8; m.sampler.injVol=2; m.pump.flow=0.21}, 'ep21');
console.log('2.1mm parabens', run(inst, sol('parabens')));
// gradient blank at 210 nm, MeOH then ACN
inst = ready([{kind:'fa'}], m=>{m.pump.B=5; m.pump.stopTime=22; m.pump.timetable=[{t:15,B:95,C:0,D:0},{t:19,B:95,C:0,D:0},{t:19.5,B:5,C:0,D:0}]; m.dad.signals[0].wl=210;});
console.log('blank gradient MeOH 210', run(inst, null));
console.log('energy after', run(inst, sol('energy'), m=>{m.dad.signals[0].wl=254;}, {wait:600}));
// carryover: stock then blank, wash off
inst = ready([{kind:'h3po4'}], m=>{m.pump.B=40; m.pump.stopTime=9; m.sampler.wash=false;});
console.log('stock', run(inst, sol('mix-stock')));
console.log('blank after, no wash', run(inst, sol('blank-mw')));
// overpressure damage: pmax 600 on a 400 bar column at 4.6 mL/min
inst = ready([], m=>{m.pump.B=50; m.pump.pmax=600; m.pump.flow=4.6; m.pump.stopTime=5});
console.log('P', inst.pump.pShown.toFixed(0), 'health', inst.column.health.toFixed(2), inst.error);
// phosphate + ACN
inst = ready([{kind:'phosphate',mM:50,pH:7.0}, {kind:'acn'}], m=>{m.pump.B=90; m.pump.stopTime=5;});
inst.advance(600); console.log('precip: clog', inst.column.clog.toFixed(1), 'P', inst.pump.pShown.toFixed(0), inst.error && inst.error.msg);
// purge valve open during a run
inst = ready([], m=>{m.pump.B=60; m.pump.stopTime=6;}); inst.setPurge(true);
console.log('purge open run', run(inst, sol('parabens')));
// empty bottle
inst = ready([], m=>{m.pump.B=60; m.pump.stopTime=6;}); inst.bottles[1].vol = 3; inst.advance(900);
console.log('bottle B empty: P', inst.pump.pShown.toFixed(0), 'head', inst.pump.head.toFixed(2), 'flowEff', inst.pump.flowEff.toFixed(2), inst.log.filter(l=>l.level!=='info').map(l=>l.msg));
// strong diluent 50 uL
inst = ready([{kind:'h3po4'}], m=>{m.pump.B=30; m.pump.stopTime=12; m.sampler.injVol=50;});
import { prepare } from '../js/hplc-sim-samples.js';
console.log('caffeine in MeOH 50uL', run(inst, prepare('x',[{id:'caffeine',mgL:20}],'meoh','q')));
console.log('caffeine in water 50uL', run(inst, prepare('x',[{id:'caffeine',mgL:20}],'water','q')));
