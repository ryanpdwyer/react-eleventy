import { React, ReactDOM, useState } from 'https://cdn.jsdelivr.net/npm/es-react@16.13.1/+esm';

// ---------- helpers ----------

const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '' };

// Accepts 1.5e-4, 1.5E-4, 1.5x10^-4, 1.5*10^-4, 1.5×10⁻⁴, 1.5 x 10-4
function parseNum(s) {
  if (s === undefined || s === null) return null;
  let t = String(s).trim().replace(/[−–]/g, '-').replace(/,/g, '');
  t = t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, m => '^' + m.split('').map(c => SUP[c]).join(''));
  t = t.replace(/\s+/g, '');
  t = t.replace(/(?:x|X|×|\*)10\^?/, 'e');
  t = t.replace(/^10\^/, '1e');
  t = t.replace(/[a-zA-Z]+$/, m => (/^e/i.test(m) ? m : ''));
  if (t === '' || !/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t)) return null;
  return Number(t);
}

function close(v, ans, rel, abs) {
  if (v === null || isNaN(v)) return false;
  if (abs !== undefined) return Math.abs(v - ans) <= abs;
  return Math.abs(v - ans) <= Math.abs(ans) * rel;
}

const Frac = ({ n, d }) => <span className="frac"><span>{n}</span><span>{d}</span></span>;

const IDU = ['Increase', 'Decrease', 'Unchanged'];
const SHIFT = ['← Left (toward reactants)', '→ Right (toward products)', 'No shift'];
const Up = () => <strong style={{ color: '#c62828' }}>↑</strong>;
const Down = () => <strong style={{ color: '#c62828' }}>↓</strong>;

// Le Chatelier strategy choices (same list every time)
const STRAT = [
  'A concentration in Q changes (the normal case)',
  'Q does not change (solid, pure liquid, inert gas at constant volume, or catalyst)',
  'Temperature change (K changes)',
  'Volume / pressure change (compare moles of gas)',
  'Water added (compare moles of aq species)',
];
const ST = { QK: 0, NONE: 1, T: 2, GAS: 3, WATER: 4 };

// ICE method choices
const METHOD = [
  'K is small (< 10⁻³): approximate, then check the 5% rule',
  'Perfect square: take the square root of both sides',
  'Quadratic formula or equation solver',
];
const MT = { APPROX: 0, SQUARE: 1, QUAD: 2 };

// ---------- question components ----------

function Choice({ q, opts, ans, fb = {}, why, onDone }) {
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const pick = i => {
    setPicked(i);
    if (i === ans && !done) { setDone(true); onDone && onDone(); }
  };
  return (
    <div>
      {q && <div className="q6-q">{q}</div>}
      <div className="q6-opts">
        {opts.map((o, i) => (
          <button key={i} type="button"
            className={'btn btn-sm ' + (picked === i ? (i === ans ? 'btn-success' : 'btn-danger') : (done && i === ans ? 'btn-success' : 'btn-outline-secondary'))}
            onClick={() => pick(i)}>{o}</button>
        ))}
      </div>
      {picked !== null && picked !== ans && <div className="q6-fb wrong">{fb[picked] || 'Not quite. Try again.'}</div>}
      {done && why && <div className="q6-fb right">{why}</div>}
    </div>
  );
}

function Num({ q, ans, unit, rel = 0.03, abs, hint, why, show, onDone }) {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('');
  const [tries, setTries] = useState(0);
  const check = e => {
    e && e.preventDefault();
    const v = parseNum(val);
    if (v === null) { setStatus('parse'); return; }
    if (close(v, ans, rel, abs)) {
      if (status !== 'right') { setStatus('right'); onDone && onDone(); }
    } else { setStatus('wrong'); setTries(tries + 1); }
  };
  const reveal = () => { setStatus('shown'); onDone && onDone(); };
  return (
    <form className="q6-num" onSubmit={check}>
      {q && <div className="q6-q">{q}</div>}
      <input className="form-control form-control-sm" value={val} onChange={e => setVal(e.target.value)} placeholder="e.g. 1.5e-4" />
      {unit && <span> {unit} </span>}
      <button type="submit" className="btn btn-sm btn-primary ml-2">Check</button>
      {status === 'wrong' && tries >= 2 && <button type="button" className="btn btn-sm btn-link" onClick={reveal}>Show answer</button>}
      {status === 'parse' && <div className="q6-fb wrong">Enter a number, e.g. 0.015, 1.5e-4, or 1.5x10^-4.</div>}
      {status === 'wrong' && <div className="q6-fb wrong">{hint || 'Not quite. Check your setup and try again.'}</div>}
      {(status === 'right' || status === 'shown') && <div className="q6-fb right">{status === 'shown' && <strong>Answer: {show || ans} {unit} </strong>}{why}</div>}
    </form>
  );
}

// Multi-part list of selects (tables): rows = [[label, answerIndex, feedback]]
function Table({ head, choices, rows, onDone }) {
  const [sel, setSel] = useState(rows.map(() => -1));
  const [checked, setChecked] = useState(false);
  const allRight = sel.every((s, i) => s === rows[i][1]);
  const check = () => { setChecked(true); if (allRight && onDone) onDone(); };
  return (
    <div>
      <table className="q6-tab">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r[0]}</td>
              <td>
                <select className="form-control form-control-sm" value={sel[i]}
                  onChange={e => { const s = sel.slice(); s[i] = Number(e.target.value); setSel(s); setChecked(false); }}>
                  <option value={-1}>choose</option>
                  {choices.map((c, j) => <option key={j} value={j}>{c}</option>)}
                </select>
              </td>
              <td>{checked && (sel[i] === r[1] ? '✓ ' : '✗ ')}{checked && sel[i] === r[1] && r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-sm btn-primary mt-2" onClick={check}>Check</button>
      {checked && !allRight && <div className="q6-fb wrong">Some rows are wrong (✗). Fix them and check again.</div>}
    </div>
  );
}

function Multi({ q, opts, ans, why }) {
  const [sel, setSel] = useState(opts.map(() => false));
  const [checked, setChecked] = useState(false);
  const right = sel.every((s, i) => s === ans.includes(i));
  return (
    <div>
      {q && <div className="q6-q">{q}</div>}
      {opts.map((o, i) => (
        <label key={i} className="mr-3">
          <input type="checkbox" checked={sel[i]} onChange={() => { const s = sel.slice(); s[i] = !s[i]; setSel(s); setChecked(false); }} /> {o}
        </label>
      ))}
      <div><button type="button" className="btn btn-sm btn-primary mt-1" onClick={() => setChecked(true)}>Check</button></div>
      {checked && (right ? <div className="q6-fb right">{why}</div> : <div className="q6-fb wrong">Not quite. Check which ones ionize completely in water.</div>)}
    </div>
  );
}

function Note({ children, onDone }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      {children}
      {!done && <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setDone(true); onDone && onDone(); }}>Next</button>}
    </div>
  );
}

// Shows steps one at a time; each step gets onDone to unlock the next.
function Steps({ children }) {
  const steps = React.Children.toArray(children);
  const [n, setN] = useState(1);
  return (
    <div>
      {steps.slice(0, n).map((s, i) => (
        <div className="q6-step" key={i}>
          {React.cloneElement(s, { onDone: () => setN(m => Math.max(m, i + 2)) })}
        </div>
      ))}
    </div>
  );
}

// Independent parts (not gated)
const Part = ({ children }) => <div className="q6-step">{children}</div>;

function Key({ children, label = 'Show key solution' }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-sm btn-link px-0" onClick={() => setOpen(!open)}>{open ? 'Hide key solution' : label}</button>
      {open && <div className="q6-key">{children}</div>}
    </div>
  );
}

const TAGS = { scaffold: 'Step by step', own: 'On your own', check: 'Self-check' };
const Prob = ({ num, mode, children }) => (
  <div className="q6-prob">
    <h3>{num}.<span className={'q6-tag ' + mode}>{TAGS[mode]}</span></h3>
    {children}
  </div>
);
const Section = ({ title, children }) => <div className="q6-section"><h2>{title}</h2>{children}</div>;
const Eq = ({ children }) => <div className="q6-eq">{children}</div>;

// ---------- reference ----------

const Ref = () => (
  <details className="q6-ref">
    <summary>Equations (same as the paper handout)</summary>
    <ul className="mb-0 mt-2">
      <li>K = Q at equilibrium; K = <Frac n="[products]^coefficients" d="[reactants]^coefficients" /> (leave out solids and pure liquids)</li>
      <li>Q &lt; K: shifts right (toward products). Q &gt; K: shifts left (toward reactants).</li>
      <li>Quadratic formula: x = <Frac n="−b ± √(b² − 4ac)" d="2a" /> for ax² + bx + c = 0</li>
      <li>5% rule: approximation is OK if x &lt; 5% of the initial concentration</li>
      <li>pH = −log[H₃O⁺]&nbsp;&nbsp; pOH = −log[OH⁻]&nbsp;&nbsp; [H₃O⁺] = 10<sup>−pH</sup>&nbsp;&nbsp; [OH⁻] = 10<sup>−pOH</sup></li>
      <li>K<sub>w</sub> = [H₃O⁺][OH⁻] = 1.0×10⁻¹⁴ and pH + pOH = 14.00 at 25 °C only</li>
    </ul>
  </details>
);

// ---------- problems ----------

function P1() {
  const r = 'Remember K = (products)^coeffs / (reactants)^coeffs. No solids or pure liquids, because their concentration is constant.';
  return (
    <Prob num="1" mode="scaffold">
      <p>Write the equilibrium constant expression (K = Q) for the following reactions. Parts a and b are step by step; c and d are on your own.</p>
      <div className="q6-fb right mb-2">{r}</div>
      <Part>
        <Choice q={<span>a) H₂CO₃(aq) ⇌ H₂O(l) + CO₂(g)</span>}
          opts={[<Frac n="[H₂O][CO₂]" d="[H₂CO₃]" />, <Frac n="[CO₂]" d="[H₂CO₃]" />, <Frac n="[H₂CO₃]" d="[CO₂]" />]}
          ans={1} fb={{ 0: 'H₂O(l) is a pure liquid, so it is left out.', 2: 'Products go on top, reactants on the bottom.' }}
          why="K = [CO₂]/[H₂CO₃]. H₂O(l) is left out." />
      </Part>
      <Part>
        <Choice q={<span>b) Fe²⁺(aq) + 3phen(aq) ⇌ Fe(phen)₃²⁺(aq)</span>}
          opts={[<Frac n="[Fe(phen)₃²⁺]" d="[Fe²⁺][phen]" />, <Frac n="[Fe(phen)₃²⁺]" d="[Fe²⁺]3[phen]" />, <Frac n="[Fe(phen)₃²⁺]" d="[Fe²⁺][phen]³" />]}
          ans={2} fb={{ 0: 'The coefficient 3 on phen becomes an exponent.', 1: 'Coefficients become exponents, not multipliers.' }}
          why="K = [Fe(phen)₃²⁺]/([Fe²⁺][phen]³). All species are aq, so all are included." />
      </Part>
      <Part>
        <Choice q={<span>c) CaCl₂(s) ⇌ Ca²⁺(aq) + 2Cl⁻(aq)</span>}
          opts={[<span>[Ca²⁺][Cl⁻]²</span>, <Frac n="[Ca²⁺][Cl⁻]²" d="[CaCl₂]" />, <span>[Ca²⁺][2Cl⁻]</span>]}
          ans={0} fb={{ 1: 'CaCl₂(s) is a solid, so it is left out.', 2: 'The coefficient 2 becomes an exponent.' }}
          why="K = [Ca²⁺][Cl⁻]². The solid is left out, so there is no denominator." />
      </Part>
      <Part>
        <Choice q={<span>d) CaCO₃(s) + 2H⁺(aq) ⇌ CO₂(g) + H₂O(l) + Ca²⁺(aq)</span>}
          opts={[<Frac n="[CO₂][Ca²⁺]" d="[H⁺]" />, <Frac n="[CO₂][H₂O][Ca²⁺]" d="[CaCO₃][H⁺]²" />, <Frac n="[CO₂][Ca²⁺]" d="[H⁺]²" />]}
          ans={2} fb={{ 0: 'The coefficient 2 on H⁺ becomes an exponent.', 1: 'Leave out CaCO₃(s) and H₂O(l).' }}
          why="K = [CO₂][Ca²⁺]/[H⁺]². CaCO₃(s) and H₂O(l) are left out." />
      </Part>
    </Prob>
  );
}

function P2() {
  return (
    <Prob num="2" mode="scaffold">
      <p>Consider the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g). At equilibrium, this reaction contains 0.40 M N₂, 0.80 M H₂, and 0.0055 M NH₃.</p>
      <Steps>
        <Choice q="a) Write the equilibrium (constant) expression for this reaction."
          opts={[<Frac n="[NH₃]²" d="[N₂][H₂]³" />, <Frac n="[N₂][H₂]³" d="[NH₃]²" />, <Frac n="2[NH₃]" d="[N₂]3[H₂]" />]}
          ans={0} fb={{ 1: 'Products on top.', 2: 'Coefficients become exponents.' }}
          why="K = Q = [NH₃]²/([N₂][H₂]³)" />
        <Num q="b) Determine the value of the equilibrium constant Kc." ans={1.477e-4} show="1.5×10⁻⁴"
          hint="Plug the equilibrium concentrations into K. Use parentheses: 0.0055²/(0.4*0.8³)."
          why="K = (0.0055)²/((0.40)(0.80)³) = 1.5×10⁻⁴" />
        <Choice q="c) Some NH₃ is removed and equilibrium is re-established, with [N₂] = 0.25 M and [H₂] = 0.24 M. To find [NH₃], do you need an ICE table?"
          opts={['Yes, start an ICE table', 'No: the system is at equilibrium, K is known, and [NH₃] is the only unknown, so plug into K = Q']}
          ans={1} fb={{ 0: 'All the concentrations given are already equilibrium values. Only one unknown is left.' }}
          why="Same K (same temperature). Solve K = Q for the one unknown." />
        <Num q="What is [NH₃]?" ans={7.14e-4} unit="M" show="7.1×10⁻⁴"
          hint="1.5×10⁻⁴ = [NH₃]²/((0.25)(0.24)³). Solve for [NH₃]² first, then take the square root."
          why="[NH₃]² = (1.5×10⁻⁴)(0.25)(0.24)³, so [NH₃] = 7.1×10⁻⁴ M" />
      </Steps>
    </Prob>
  );
}

function P3() {
  return (
    <Prob num="3" mode="own">
      <p>In a pond, the equilibrium CaCO₃(s) + H⁺(aq) ⇌ Ca²⁺(aq) + HCO₃⁻(aq), with K = 137 at 15 °C, determines the lake's acidity. When the lake reaches equilibrium, [Ca²⁺] = 2.6 × 10⁻² M and [HCO₃⁻] = 3.3 × 10⁻³ M. What is [H⁺]?</p>
      <Part><Num q="[H⁺] =" ans={6.26e-7} unit="M" show="6.3×10⁻⁷" /></Part>
      <Key>
        <p>Same idea as previous. Already at eq, so just solve K = Q for [H⁺] (only unknown). CaCO₃(s) is left out.</p>
        <Eq>137 = <Frac n="[Ca²⁺][HCO₃⁻]" d="[H⁺]" /></Eq>
        <Eq>[H⁺] = <Frac n="(2.6×10⁻²)(3.3×10⁻³)" d="137" /> = 6.3×10⁻⁷ M</Eq>
      </Key>
    </Prob>
  );
}

function P4() {
  return (
    <Prob num="4" mode="scaffold">
      <p>Consider the following reaction at equilibrium: I₃⁻(aq) ⇌ I₂(s) + I⁻(aq) with Kc = 1.1</p>
      <Steps>
        <Choice q="a) Write the equilibrium constant expression for this reaction."
          opts={[<Frac n="[I₂][I⁻]" d="[I₃⁻]" />, <Frac n="[I⁻]" d="[I₃⁻]" />, <Frac n="[I₃⁻]" d="[I⁻]" />]}
          ans={1} fb={{ 0: 'I₂(s) is a solid, so it is left out.', 2: 'Products on top.' }}
          why="Kc = [I⁻]/[I₃⁻]" />
        <Choice q="b) In a sample at equilibrium, spectrophotometric data shows that [I₃⁻] = 0.091 M. What is the first step to find [I⁻]?"
          opts={['Set up an ICE table', 'At equilibrium already. No need for ICE table. Solve K = Q for [I⁻]']}
          ans={1} fb={{ 0: 'The sample is already at equilibrium, and K is given, so [I⁻] is the only unknown.' }}
          why="1.1 = [I⁻]/[I₃⁻]" />
        <Num q="[I⁻] =" ans={0.1001} unit="M" show="0.10"
          hint="1.1 = [I⁻]/0.091. Multiply both sides by 0.091."
          why="[I⁻] = 1.1(0.091 M) = 0.10 M" />
      </Steps>
    </Prob>
  );
}

function P5() {
  return (
    <Prob num="5" mode="scaffold">
      <p>Consider the reaction CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g) at T = 300 °C. At equilibrium, [CO] = [H₂O] = 0.20 M and [CO₂] = [H₂] = 1.20 M.</p>
      <Steps>
        <Num q="a) What is Q? (Under these conditions, Kc = Q.)" ans={36}
          hint="Q = [CO₂][H₂]/([CO][H₂O])"
          why={<span>Q = <Frac n="[1.2][1.2]" d="[0.2][0.2]" /> = 36. At equilibrium, so Kc = Q = 36.</span>} />
        <Choice q="b) The temperature is quickly increased to 500 °C, where Kc = 4.0 (same concentrations, so Q is still 36). Which direction will the reaction proceed to reach equilibrium?"
          opts={['Right (toward products)', 'Left (toward reactants)', 'No shift']}
          ans={1} fb={{ 0: 'Compare Q to K on the number line. Q = 36 is larger than K = 4.0.', 2: 'Q ≠ K, so the system is no longer at equilibrium.' }}
          why="Q = 36 > K = 4.0. Q must decrease to reach K, so the reaction shifts left, toward reactants." />
        <Choice q="c) Set up the ICE table. Because the reaction proceeds left, what goes in the C (change) row?"
          opts={['CO +x, H₂O +x, CO₂ −x, H₂ −x', 'CO −x, H₂O −x, CO₂ +x, H₂ +x']}
          ans={0} fb={{ 1: 'The reaction runs left: products convert to reactants.' }}
          why="Because rxn proceeds left, must convert products to reactants: E row is 0.2 + x, 0.2 + x, 1.2 − x, 1.2 − x. (Or you can use −x on reactants and accept a negative value of x.)" />
        <Choice q={<span>Choose a method for <Frac n="(1.2 − x)(1.2 − x)" d="(0.2 + x)(0.2 + x)" /> = 4.0</span>}
          opts={METHOD} ans={MT.SQUARE}
          fb={{ [MT.APPROX]: 'K = 4.0 is not small, so x is not negligible.', [MT.QUAD]: 'That works too, but look at the form first: it is a perfect square.' }}
          why="K is not small, so solve exactly. Looking at the form, this happens to be a perfect square, so we can take a square root: 2 = (1.2 − x)/(0.2 + x)." />
        <Num q="Solve for x." ans={0.2667} rel={0.02} show="0.267"
          hint="2(0.2 + x) = 1.2 − x, so 0.4 + 2x = 1.2 − x. Add x and subtract 0.4 from both sides."
          why="3x = 0.8, so x = 0.267 M. Plug into the E row." />
        <Num q="Equilibrium [CO] (= [H₂O]):" ans={0.4667} unit="M" rel={0.02} show="0.47" hint="[CO] = 0.2 + x" why="[CO] = [H₂O] = 0.2 + x = 0.47 M" />
        <Num q="Equilibrium [CO₂] (= [H₂]):" ans={0.9333} unit="M" rel={0.02} show="0.93" hint="[CO₂] = 1.2 − x"
          why="[CO₂] = [H₂] = 1.2 − x = 0.93 M. Check: Q = (0.93)²/(0.47)² = 3.92, close to 4.0 within rounding error ✓" />
      </Steps>
    </Prob>
  );
}

function P6() {
  return (
    <Prob num="6" mode="own">
      <p>At 100 °C, Kc = 60.6 for the reaction 2NOBr(g) ⇌ 2NO(g) + Br₂(g). In a given experiment, 0.10 mol of each substance were placed in a 1.0 L container.</p>
      <Part><Num q="Q =" ans={0.1} show="0.10" /></Part>
      <Part><Choice q="(a) Is the system at equilibrium?" opts={['Yes', 'No']} ans={1} why="No, since K ≠ Q (60.6 vs. 0.10)." /></Part>
      <Part><Choice q="(b) If not, in which direction will the reaction proceed?" opts={SHIFT} ans={1} why="Q = 0.10 < K = 60.6, so rxn proceeds right, towards products." /></Part>
      <Key>
        <Eq>Q = <Frac n="[NO]²[Br₂]" d="[NOBr]²" /> = <Frac n="(0.1)²(0.1)" d="(0.1)²" /> = 0.1</Eq>
        <p>a) No, since K ≠ Q. b) Q (0.1) is on the reactant side of K (60.6) on the number line, so rxn proceeds right, towards products.</p>
      </Key>
    </Prob>
  );
}

// One Le Chatelier event: strategy, then K, shift, and the amount asked about
function ShiftStep({ rxn, shift, shiftWhy, onDone }) {
  return (
    <div>
      <div className="q6-q">Stress (red arrow):</div>
      <Eq>{rxn}</Eq>
      <Choice q="Which direction does the reaction shift?" opts={SHIFT} ans={shift} why={shiftWhy} onDone={onDone} />
    </div>
  );
}

function LeChat({ event, rxn, strat, k, shift, shiftWhy, kWhy, amtLabel, amt, why }) {
  return (
    <div className="q6-step">
      <div className="q6-q"><strong>{event}</strong></div>
      <Steps>
        <Choice q="Which tool fits this stress?" opts={STRAT} ans={strat} />
        <ShiftStep rxn={rxn} shift={shift} shiftWhy={shiftWhy} />
        <Choice q="How does K change?" opts={IDU} ans={k} why={kWhy} />
        <Choice q={amtLabel} opts={IDU} ans={amt} why={why} />
      </Steps>
    </div>
  );
}

function P7() {
  const ag = 'How does the mol of Ag⁺ present change when eq. is re-established?';
  return (
    <Prob num="7" mode="scaffold">
      <p>The reaction 2Ag⁺(aq) + SO₄²⁻(aq) ⇌ Ag₂SO₄(s) reaches equilibrium. The reaction has ΔH = −17.8 kJ/mol.</p>
      <div className="q6-fb right mb-2">Exothermic ⇒ heat = product: 2Ag⁺(aq) + SO₄²⁻(aq) ⇌ Ag₂SO₄(s) + heat. K only depends on T (equilibrium constant).</div>
      <LeChat event="a) SO₄²⁻(aq) is removed" strat={ST.QK}
        rxn={<span>2Ag⁺(aq) + SO₄²⁻(aq)<Down /> ⇌ Ag₂SO₄(s) + heat</span>}
        shift={0} shiftWhy="Stress: [SO₄²⁻], a reactant, decreases. The system opposes the stress by making more SO₄²⁻, so it shifts ← left, toward reactants."
        k={2} kWhy="Unchanged. K only depends on T."
        amtLabel={ag} amt={0} why="The shift ← left makes reactants, so Ag⁺ increases." />
      <LeChat event="b) Ag₂SO₄(s) is added" strat={ST.NONE}
        rxn={<span>2Ag⁺(aq) + SO₄²⁻(aq) ⇌ Ag₂SO₄(s)<Up /> + heat</span>}
        shift={2} shiftWhy="[Ag₂SO₄] is constant bc it is a solid, so it is not in Q. Adding solid does not change Q ⇒ no stress, no shift."
        k={2} kWhy="Unchanged. K only depends on T."
        amtLabel={ag} amt={2} why="No shift, so Ag⁺ is unchanged." />
      <LeChat event="c) The temperature is increased" strat={ST.T}
        rxn={<span>2Ag⁺(aq) + SO₄²⁻(aq) ⇌ Ag₂SO₄(s) + heat<Up /></span>}
        shift={0} shiftWhy="Exothermic, so heat is a product. Increasing T adds heat, a product. The system uses up the added product by shifting ← left, toward reactants."
        k={1} kWhy="T does affect K. Since the shift was toward reactants, K decreased (smaller K favors reactants, larger K favors products)."
        amtLabel={ag} amt={0} why="The shift ← left makes reactants, so Ag⁺ increases." />
      <LeChat event="d) Water is added to the solution" strat={ST.WATER}
        rxn={<span>2Ag⁺(aq)<Down /> + SO₄²⁻(aq)<Down /> ⇌ Ag₂SO₄(s) + heat&nbsp;&nbsp; (3 mol aq ⇌ 0 mol aq)</span>}
        shift={0} shiftWhy="Adding water decreases the conc. of all aq species. The system increases the conc. by shifting to the side with more moles of aq species: reactants (3 mol aq vs. 0), so ← left."
        k={2} kWhy="Unchanged. K only depends on T."
        amtLabel={ag} amt={0} why="The shift ← left makes reactants, so the mol of Ag⁺ increases." />
    </Prob>
  );
}

function P8() {
  const parts = [
    ['e) The volume of the container is decreased.', 'Moles of C(s) present', 0, 2, 'Stress increases P, so system decreases P by shifting to side w/ fewer moles of gas (reactants), so C(s) increases. K only changes with T.'],
    ['f) Add 1 atm of Ar(g).', 'Moles of CO(g) present', 2, 2, 'No change to Q, K. Ar is not in Q.'],
    ['g) Increase the temperature.', 'Moles of H₂O(g) present', 1, 0, 'Endothermic: heat is a reactant. Adding heat shifts right, so H₂O decreases. Shift toward products means K increases.'],
    ['h) Add H₂(g).', 'Moles of CO(g) present', 1, 2, 'Adding a product makes Q > K, so shift left: CO decreases. K is unchanged.'],
  ];
  return (
    <Prob num="8" mode="own">
      <p>The system starts at equilibrium: C(s) + H₂O(g) ⇌ CO(g) + H₂(g) (endothermic). Denote with I = increase, D = decrease, or U = unchanged what will happen to the variables indicated.</p>
      {parts.map((p, i) => (
        <Part key={i}>
          <div className="q6-q"><strong>{p[0]}</strong></div>
          <Choice q={p[1]} opts={IDU} ans={p[2]} />
          <div className="mt-2"><Choice q="K" opts={IDU} ans={p[3]} why={p[4]} /></div>
        </Part>
      ))}
    </Prob>
  );
}

function P9() {
  return (
    <Prob num="9" mode="scaffold">
      <p>For the reaction 2NO₂(g) ⇌ N₂O₄(g), Kp = 0.12 at 298 K. When a container held at 298 K is filled with NO₂ at an initial pressure of 15 atm, what are the equilibrium partial pressures of both species?</p>
      <Steps>
        <Note>
          <p>0. Rxn is given. Kp = Q ⇒ 0.12 = P(N₂O₄)/P(NO₂)²</p>
        </Note>
        <Choice q="1. ICE table (atm). I row: NO₂ 15, N₂O₄ 0. Which C row?"
          opts={['NO₂ −x, N₂O₄ +x', 'NO₂ −2x, N₂O₄ +x', 'NO₂ −x, N₂O₄ +2x']}
          ans={1} fb={{ 0: 'Use the coefficients: 2 NO₂ are used for every N₂O₄ formed.', 2: 'Only N₂O₄ starts at 0, so the reaction runs right; 2 NO₂ make 1 N₂O₄.' }}
          why="E row: P(NO₂) = 15 − 2x, P(N₂O₄) = x, so 0.12 = x/(15 − 2x)²" />
        <Choice q="2. Choose a method." opts={METHOD} ans={MT.QUAD}
          fb={{ [MT.APPROX]: 'Can\'t approx since K is not very small (K > 10⁻³).', [MT.SQUARE]: 'x/(15 − 2x)² is not a perfect square (no square on top).' }}
          why="Need to get to ax² + bx + c = 0: multiply both sides by (15 − 2x)² and FOIL. 0.12(225 − 60x + 4x²) = x, so 0.48x² − 8.2x + 27 = 0" />
        <Choice q="3. The quadratic gives x = 4.45 or 12.63 atm. Which one?"
          opts={['x = 4.45 atm', 'x = 12.63 atm']} ans={0}
          fb={{ 1: 'x = 12.63 would cause P(NO₂) = 15 − 2x = −10.3 atm. A pressure can\'t be negative.' }}
          why="x = 12.63 is impossible (negative P(NO₂)), so x = 4.45 atm." />
        <Num q="P(NO₂) =" ans={6.09} unit="atm" show="6.1" hint="P(NO₂) = 15 − 2x" why="P(NO₂) = 15 − 2(4.45) = 6.1 atm" />
        <Num q="P(N₂O₄) =" ans={4.454} unit="atm" show="4.5" hint="P(N₂O₄) = x"
          why="P(N₂O₄) = x = 4.5 atm. Check answer: Q = 4.5/6.1² = 0.12 = K ✓" />
      </Steps>
    </Prob>
  );
}

function P10() {
  return (
    <Prob num="10" mode="own">
      <p>For the reaction C(s) + CO₂(g) ⇌ 2CO(g), Kp = 1.9 at 1000 K. A container holds excess carbon and CO₂ at an initial pressure of 3.0 atm. What are the equilibrium partial pressures of both gases?</p>
      <Part><Choice q="Method?" opts={METHOD} ans={MT.QUAD}
        fb={{ [MT.APPROX]: 'K = 1.9 is not small.', [MT.SQUARE]: '(2x)²/(3.0 − x): only the top is a square.' }}
        why="1.9 = (2x)²/(3.0 − x), so 4x² + 1.9x − 5.7 = 0" /></Part>
      <Part><Num q="P(CO₂) =" ans={2.02} abs={0.06} unit="atm" show="2.0" /></Part>
      <Part><Num q="P(CO) =" ans={1.96} abs={0.06} unit="atm" show="2.0" /></Part>
      <Key>
        <p>C(s) is left out of K: Kp = P(CO)²/P(CO₂). ICE: CO₂ 3.0 − x, CO 2x.</p>
        <Eq>1.9 = <Frac n="(2x)²" d="3.0 − x" /> ⇒ 4x² + 1.9x − 5.7 = 0</Eq>
        <p>Quadratic: x = 0.98 atm (the other root is negative). P(CO₂) = 3.0 − 0.98 = 2.0 atm, P(CO) = 2(0.98) = 2.0 atm.</p>
        <p>Check: Q = (2.0)²/2.0 ≈ 1.9 ✓</p>
      </Key>
    </Prob>
  );
}

function P11() {
  return (
    <Prob num="11" mode="own">
      <p>For the reaction Br₂(g) + Cl₂(g) ⇌ 2BrCl(g), Kc = 7.0. A container is filled with only BrCl, at 0.40 M. What are the equilibrium concentrations of all three gases?</p>
      <Part><Choice q="Which way does the reaction run?" opts={['Right', 'Left']} ans={1} why="Only products at the start (Q = ∞ > K), so it runs left: BrCl 0.40 − 2x, Br₂ +x, Cl₂ +x." /></Part>
      <Part><Choice q="Method?" opts={METHOD} ans={MT.SQUARE}
        fb={{ [MT.APPROX]: 'K = 7.0 is not small.', [MT.QUAD]: 'That works, but (0.40 − 2x)²/(x·x) is a perfect square.' }}
        why="√7.0 = (0.40 − 2x)/x" /></Part>
      <Part><Num q="[Br₂] = [Cl₂] =" ans={0.0861} unit="M" show="0.086" /></Part>
      <Part><Num q="[BrCl] =" ans={0.2278} unit="M" show="0.23" /></Part>
      <Key>
        <Eq>7.0 = <Frac n="(0.40 − 2x)²" d="(x)(x)" /> ⇒ 2.65 = <Frac n="0.40 − 2x" d="x" /></Eq>
        <p>2.65x + 2x = 0.40, so x = 0.086 M. [Br₂] = [Cl₂] = 0.086 M, [BrCl] = 0.40 − 2(0.086) = 0.23 M.</p>
        <p>Check: Q = (0.23)²/(0.086)² = 7.0 ✓</p>
      </Key>
    </Prob>
  );
}

function P12() {
  return (
    <Prob num="12" mode="scaffold">
      <p>1.0 mol of CH₃NH₂ is dissolved in 2.0 L of water.</p>
      <Eq>CH₃NH₂(aq) + H₂O(l) ⇌ CH₃NH₃⁺(aq) + OH⁻(aq)&nbsp;&nbsp;&nbsp; Kb = 4.4×10⁻⁴</Eq>
      <Steps>
        <Choice q="a) Label each substance (in order: CH₃NH₂, H₂O, CH₃NH₃⁺, OH⁻)."
          opts={['acid, base, conj. base, conj. acid', 'base, acid, conj. acid, conj. base', 'base, acid, conj. base, conj. acid']}
          ans={1} fb={{ 0: 'CH₃NH₂ gains a proton (N with a lone pair), so it is the base.', 2: 'CH₃NH₂ gains H⁺ to become CH₃NH₃⁺, its conjugate acid.' }}
          why="CH₃NH₂ (base) / CH₃NH₃⁺ (conj. acid) are a pair; H₂O (acid) / OH⁻ (conj. base) are a pair." />
        <Num q="b) Initial [CH₃NH₂] =" ans={0.5} unit="M" show="0.50" hint="Molarity = mol / L" why="1.0 mol / 2.0 L = 0.50 M. ICE: E row 0.5 − x, x, x." />
        <Choice q="Method?" opts={METHOD} ans={MT.APPROX}
          fb={{ [MT.SQUARE]: 'x²/(0.5 − x) is not a perfect square.', [MT.QUAD]: 'That works, but K is small, so the approximation is faster.' }}
          why={<span>K is small (&lt; 10⁻³), so approximate 0.5 − x ≈ 0.5: 4.4×10⁻⁴ = <Frac n="[x][x]" d="0.5 − x" /> ≈ <Frac n="x²" d="0.5" /></span>} />
        <Num q="x =" ans={0.01483} unit="M" show="0.015" hint="x = √((4.4×10⁻⁴)(0.5))" why="x = √((4.4×10⁻⁴)(0.5)) = 0.015 M" />
        <Choice q="Check the 5% rule: is 0.015 M < 5% of 0.50 M (0.025 M)?" opts={['Yes, the approximation is OK', 'No, use the quadratic']} ans={0}
          why="0.015 < 0.025 ✓. [CH₃NH₃⁺]eq = x = 0.015 M" />
      </Steps>
    </Prob>
  );
}

function P13() {
  return (
    <Prob num="13" mode="own">
      <p>0.80 mol of HC₃H₅O₃ is dissolved in 500.0 mL of water.</p>
      <Eq>HC₃H₅O₃(aq) + H₂O(l) ⇌ H₃O⁺(aq) + C₃H₅O₃⁻(aq)&nbsp;&nbsp;&nbsp; Ka = 1.4×10⁻⁴</Eq>
      <Part><Choice q="a) Label each substance (in order: HC₃H₅O₃, H₂O, H₃O⁺, C₃H₅O₃⁻)."
        opts={['acid, base, conj. acid, conj. base', 'base, acid, conj. acid, conj. base', 'acid, base, conj. base, conj. acid']} ans={0}
        why="HC₃H₅O₃ (acid) / C₃H₅O₃⁻ (conj. base); H₂O (base) / H₃O⁺ (conj. acid)." /></Part>
      <Part><Choice q="b) At equilibrium, do you expect" opts={['mainly reactants', 'mainly products', 'similar amounts of both']} ans={0}
        why="Mainly reactants, bc K is small." /></Part>
      <Part><Num q="c) [H₃O⁺] =" ans={0.01497} unit="M" show="0.015" /></Part>
      <Key>
        <p>Initial [HC₃H₅O₃] = 0.80 mol / 0.5000 L = 1.6 M. ICE: E row 1.6 − x, x, x.</p>
        <p>K is small (&lt; 10⁻³), so approximate: 1.4×10⁻⁴ ≈ x²/1.6, x = √((1.4×10⁻⁴)(1.6)) = 0.015 M</p>
        <p>Check: 0.015 M &lt; 5% of 1.6 = 0.08 M ✓. [H₃O⁺] = x = 0.015 M</p>
      </Key>
    </Prob>
  );
}

function P14() {
  const acids = ['HCl', 'HF', 'HBr', 'HI', 'HNO₂', 'HNO₃', 'H₂SO₄', 'H₃PO₄', 'HClO₄', 'CH₃COOH', 'HCN'];
  return (
    <Prob num="14" mode="check">
      <Multi q="Select the 6 strong acids used in CHE 120." opts={acids} ans={[0, 2, 3, 5, 6, 8]}
        why="HCl, HBr, HI, HNO₃, H₂SO₄, and HClO₄ (3 halogen acids, remember HF is weak, and 3 oxyacids)." />
    </Prob>
  );
}

function P15() {
  return (
    <Prob num="15" mode="check">
      <Choice q="Define a strong base according to CHE 120N."
        opts={['Any compound that contains OH', 'A group I, II, or III cation with an oxide or hydroxide anion', 'Any compound with a nitrogen that has a lone pair', 'Any compound that accepts a proton']}
        ans={1} fb={{ 0: 'C₂H₅OH has an OH that is covalently bonded to C. It is not a base.', 2: 'N with a lone pair usually means a weak base.', 3: 'That defines any Brønsted-Lowry base, strong or weak.' }}
        why="A group I, II, or III cation with an oxide or hydroxide anion. So things like NaOH, LiOH, KOH, Ca(OH)₂, Ba(OH)₂, Li₂O, CaO, etc." />
    </Prob>
  );
}

function P16() {
  const C = ['SA', 'WA', 'SB', 'WB'];
  return (
    <Prob num="16" mode="check">
      <p>For each substance, choose SA = strong acid, WA = weak acid, SB = strong base, or WB = weak base.</p>
      <Table head={['Substance', 'SA, WA, SB, or WB', '']} choices={C} rows={[
        ['HCl', 0, 'Memorize the strong acids. This is on the list.'],
        ['CH₃COOH', 1, 'Not a strong acid. Neutral covalent molecule with a COOH group: acetic acid, a weak acid.'],
        ['KOH', 2, 'Group I cation with a hydroxide anion.'],
        ['C₆H₅OH', 1, 'All non-metals, so a neutral covalent molecule. No N with a lone pair. It is phenol, a weak acid.'],
        ['HBr', 0, 'One of our 6 strong acids.'],
        ['HCN', 1, 'H in front, not ionic. In the table, it is a weak acid.'],
        ['CH₃NH₂', 3, 'N making 3 bonds (1 lone pair): methylamine, a weak base.'],
        ['H₂C₂O₄', 1, 'Covalent molecule with H₂ out front: oxalic acid, a weak (polyprotic) acid.'],
        ['Na₂O', 2, 'Group I metal with oxide anion = strong base.'],
        ['Ba(OH)₂', 2, 'Group II cation with hydroxide anions.'],
      ]} />
    </Prob>
  );
}

function P17() {
  const C = ['Strong electrolyte', 'Weak electrolyte', 'Nonelectrolyte'];
  return (
    <Prob num="17" mode="check">
      <p>Classify each 0.10 M solution.</p>
      <Table head={['Solution', 'Classification', '']} choices={C} rows={[
        ['HNO₃', 0, 'One of the 6 strong acids: breaks apart completely into ions.'],
        ['HCOOH', 1, 'Weak acid (COOH group): only a few ions form.'],
        ['C₂H₅OH', 2, 'Covalent molecule. The OH is bonded to C (not an OH⁻ ion), so no ions form.'],
        ['RbOH', 0, 'Group I hydroxide (strong base).'],
        ['(CH₃)₂NH', 1, 'Weak base (N with a lone pair): only a few ions form.'],
      ]} />
    </Prob>
  );
}

function P18() {
  return (
    <Prob num="18" mode="check">
      <p>Water is not shown in the pictures below.</p>
      <Part>
        <img className="q6-img" src="/img/che120-q6-naoh-beakers.png" alt="Two beakers. A shows mostly NaOH units; B shows separate Na+ and OH- ions." />
        <Choice q="i) Which beaker shows 0.10 M NaOH(aq)?" opts={['A', 'B']} ans={1}
          fb={{ 0: 'A still has NaOH units. That looks like a weak electrolyte.' }}
          why="B. NaOH is a strong base (group I hydroxide), so it dissociates completely: NaOH(s) ⟶ Na⁺(aq) + OH⁻(aq). There are no NaOH units left." />
      </Part>
      <Part>
        <img className="q6-img" src="/img/che120-q6-caoh2-beakers.png" alt="Three beakers of calcium hydroxide particle pictures labeled A, B, and C." />
        <Choice q="ii) Which beaker shows 0.10 M Ca(OH)₂?" opts={['A', 'B', 'C']} ans={0}
          fb={{ 1: 'B still has Ca(OH)₂ units (weak electrolyte).', 2: 'C only broke off one OH⁻ (CaOH⁺).' }}
          why="A. Ca(OH)₂ is a strong base (group II hydroxide): Ca(OH)₂(s) ⟶ Ca²⁺(aq) + 2OH⁻(aq). Every Ca²⁺ comes with two OH⁻ (4 Ca²⁺, 8 OH⁻)." />
      </Part>
    </Prob>
  );
}

function P19() {
  const qs = [
    ['What is the conjugate acid of CO₃²⁻?', ['HCO₃⁻', 'H₂CO₃', 'CO₃⁻'], 0, 'HCO₃⁻ (charge increases from −2 to −1 and 1 more H atom)'],
    ['What is the conjugate base of HOCl?', ['OCl⁻', 'H₂OCl⁺', 'Cl⁻'], 0, 'OCl⁻'],
    ['What is the conjugate acid of HPO₄²⁻?', ['PO₄³⁻', 'H₂PO₄⁻', 'H₂PO₄²⁻'], 1, 'H₂PO₄⁻ (1 more H, charge from −2 to −1)'],
    ['What is the conjugate base of HPO₄²⁻?', ['PO₄²⁻', 'PO₄³⁻', 'H₂PO₄⁻'], 1, 'PO₄³⁻ (remember to decrease the charge by 1)'],
    ['What is the conjugate acid of C₆H₅N?', ['C₆H₅NH⁺', 'C₆H₅NH', 'C₆H₄N⁻'], 0, 'C₆H₅NH⁺ (add a proton and increase the charge by 1)'],
    ['What is the conjugate acid of OCl⁻?', ['HOCl', 'OCl²⁻', 'HOCl⁺'], 0, 'HOCl'],
  ];
  return (
    <Prob num="19" mode="check">
      <p>Conjugates! An acid donates a proton to a base, so the conjugate base has 1 less proton and 1 lower charge (opposite for conjugate acid: 1 more proton and 1 higher charge).</p>
      {qs.map((x, i) => <Part key={i}><Choice q={x[0]} opts={x[1]} ans={x[2]} why={x[3]} /></Part>)}
    </Prob>
  );
}

function P20() {
  return (
    <Prob num="20" mode="check">
      <p>Write the products of the following acid-base reactions. Label each species as the acid, base, conjugate acid, or conjugate base.</p>
      <Part><Choice q="a) HClO₂(aq) + F⁻(aq) ⇌" opts={['ClO₂⁻(aq) + HF(aq)', 'H₂ClO₂⁺(aq) + F²⁻(aq)', 'HClO₂F⁻(aq)']} ans={0}
        why="HClO₂ is an acid, F⁻ is a base (conjugate base of HF, a weak acid). So the acid donates a proton to the base: HClO₂ (acid) + F⁻ (base) ⇌ ClO₂⁻ (conjugate base) + HF (conjugate acid)." /></Part>
      <Part><Choice q="b) HCOOH(aq) + OH⁻(aq) ⟶" opts={['HCOO⁻(aq) + H₂O(l)', 'HCOOH₂⁺(aq) + O²⁻(aq)', 'HCOOH(aq) + OH⁻(aq) (no reaction)']} ans={0}
        why="HCOOH is an acid, OH⁻ is a base. HCOOH (acid) + OH⁻ (base) ⟶ HCOO⁻ (conj. base) + H₂O (conj. acid)." /></Part>
      <Part><Choice q="c) HC₂O₄⁻(aq) + H₂O(l) ⇌ H₃O⁺(aq) + C₂O₄²⁻(aq). Is water acting as an acid or a base?" opts={['Acid', 'Base']} ans={1}
        why="HC₂O₄⁻ donates a proton to water, making H₃O⁺. So HC₂O₄⁻ is the acid and water is acting as a base. HC₂O₄⁻ (acid), H₂O (base), H₃O⁺ (conj. acid), C₂O₄²⁻ (conj. base)." /></Part>
      <Part><Choice q="d) H₂PO₄⁻(aq) + H₂O(l) ⇌ H₃PO₄(aq) + OH⁻(aq). Is water acting as an acid or a base?" opts={['Acid', 'Base']} ans={0}
        why="Water donates a proton to H₂PO₄⁻, making OH⁻. So water is acting as an acid and H₂PO₄⁻ is the base (H₂PO₄⁻ can act as an acid or a base, just like water). H₂PO₄⁻ (base), H₂O (acid), H₃PO₄ (conj. acid), OH⁻ (conj. base)." /></Part>
    </Prob>
  );
}

function P21() {
  return (
    <Prob num="21" mode="scaffold">
      <Steps>
        <Num q="a) The pOH of a solution is 3.25. What is the pH?" ans={10.75} abs={0.011} show="10.75"
          hint="pH + pOH = 14.00 at 25 °C" why="pH = 14.00 − pOH = 14.00 − 3.25 = 10.75" />
        <Choice q="Is the solution acidic, basic, or neutral?" opts={['Acidic', 'Basic', 'Neutral']} ans={1} why="pH > 7, so the solution is basic." />
        <Num q="b) A solution has pH = 9.36. What is [H₃O⁺]?" ans={4.365e-10} unit="M" show="4.4×10⁻¹⁰"
          hint="[H₃O⁺] = 10^(−pH)" why="[H₃O⁺] = 10⁻⁹·³⁶ = 4.4×10⁻¹⁰ M. Only numbers after the decimal in pH are significant, so 9.36 gives 2 sig figs." />
        <Num q="What is [OH⁻]?" ans={2.29e-5} unit="M" show="2.3×10⁻⁵"
          hint="Kw = [H₃O⁺][OH⁻] = 1.0×10⁻¹⁴" why="[OH⁻] = 1.0×10⁻¹⁴ / 4.4×10⁻¹⁰ = 2.3×10⁻⁵ M" />
      </Steps>
    </Prob>
  );
}

function P22() {
  return (
    <Prob num="22" mode="own">
      <Part><Num q="a) What is the pH of 4.8×10⁻³ M HClO₄?" ans={2.319} abs={0.011} show="2.32" /></Part>
      <Part><Num q="What is [OH⁻]?" ans={2.08e-12} unit="M" show="2.1×10⁻¹²" /></Part>
      <Part><Choice q="Write the overall chemical equation that describes this process."
        opts={['HClO₄(aq) + H₂O(l) ⟶ H₃O⁺(aq) + ClO₄⁻(aq)', 'HClO₄(aq) + H₂O(l) ⇌ H₃O⁺(aq) + ClO₄⁻(aq) (mostly reactants)', 'HClO₄(aq) ⟶ H⁺(aq) + Cl⁻(aq) + 2O₂(g)']}
        ans={0} fb={{ 1: 'HClO₄ is a strong acid: it ionizes completely (one-way arrow).' }}
        why="HClO₄ is a strong acid, so it ionizes completely." /></Part>
      <Part><Num q="b) What is the pH of a solution containing 0.0021 mol Sr(OH)₂ in 3.5 L?" ans={11.079} abs={0.011} show="11.08" /></Part>
      <Key>
        <p>a) The stoichiometry is 1:1, so [H₃O⁺] = 4.8×10⁻³ M. pH = −log(4.8×10⁻³) = 2.32. [OH⁻] = Kw/[H₃O⁺] = 1.0×10⁻¹⁴ / 4.8×10⁻³ = 2.1×10⁻¹² M</p>
        <p>b) Sr(OH)₂ is a strong base (group II hydroxide): Sr(OH)₂(s) ⟶ Sr²⁺(aq) + 2OH⁻(aq). First find the molarity, then use the 1:2 stoichiometry.</p>
        <p>[Sr(OH)₂] = 0.0021 mol / 3.5 L = 6.0×10⁻⁴ M; [OH⁻] = 2(6.0×10⁻⁴ M) = 1.2×10⁻³ M</p>
        <p>pOH = −log(1.2×10⁻³) = 2.92; pH = 14.00 − 2.92 = 11.08. Check: base, so pH &gt; 7 ✓</p>
      </Key>
    </Prob>
  );
}

// ---------- extra practice ----------

function P23() {
  return (
    <Prob num="23" mode="check">
      <p>Different forms of the amino acid alanine: YH ⇌ ⁺HY⁻, K = 3.5×10⁷</p>
      <Choice q="Which form of the amino acid is more prevalent in aqueous solution?" opts={['YH', '⁺HY⁻']} ans={1}
        why="K = 3.5×10⁷ is very large, so products are favored: ⁺HY⁻." />
    </Prob>
  );
}

function P24() {
  const parts = [
    ['a) CO is added.', 'Moles of Fe₃O₄ present', 1, 2, 'Adding a reactant shifts right, using up Fe₃O₄. K only changes with T.'],
    ['b) Fe₃O₄(s) is added.', 'Moles of CO₂ present', 2, 2, 'No change in conc. (solid).'],
    ['c) The volume of the container is increased.', 'Moles of FeO present', 2, 2, 'Decrease P, but same moles of gas on both sides (1 vs 1), so unchanged.'],
  ];
  return (
    <Prob num="24" mode="check">
      <p>The system starts at equilibrium: CO(g) + Fe₃O₄(s) ⇌ CO₂(g) + 3FeO(s)</p>
      {parts.map((p, i) => (
        <Part key={i}>
          <div className="q6-q"><strong>{p[0]}</strong></div>
          <Choice q={p[1]} opts={IDU} ans={p[2]} />
          <div className="mt-2"><Choice q="K" opts={IDU} ans={p[3]} why={p[4]} /></div>
        </Part>
      ))}
      <Part>
        <Choice q="d) When the temperature is increased, more CO₂(g) is formed. Did K increase, decrease, or remain unchanged?" opts={IDU} ans={0}
          why="Increase, since more products = larger K, Q." />
        <div className="mt-2"><Choice q="Is the reaction exothermic or endothermic?" opts={['Exothermic', 'Endothermic']} ans={1}
          why="Endothermic: heat + reactants ⇌ products. To see a shift towards products when heat is added, heat must be a reactant." /></div>
      </Part>
    </Prob>
  );
}

function P25() {
  const D = ['Forward (→)', 'Reverse (←)', 'No shift (N/A)'];
  return (
    <Prob num="25" mode="check">
      <p>Consider the following exothermic reaction at equilibrium: CaCO₃(s) + 2H⁺(aq) ⇌ H₂O(l) + CO₂(g) + Ca²⁺(aq)</p>
      <Part><Choice q="a) Reducing pressure" opts={D} ans={0} why="Forward (right): shift toward more moles of gas (1 CO₂ on the product side, 0 on the reactant side)." /></Part>
      <Part><Choice q="b) Reducing temperature" opts={D} ans={0} why="Forward (right): exothermic, so heat is a product. Removing heat shifts right to replace it." /></Part>
      <Part><Choice q="c) Increasing [Ca²⁺]" opts={D} ans={1} why="Reverse (left): adding a product." /></Part>
      <Part><Choice q="d) Adding a catalyst" opts={D} ans={2} why="No shift. Catalyst speeds both forward & reverse rxn, does not change eq. position (doesn't affect K or Q)." /></Part>
      <Part><Choice q="e) Which stress above changes the value of K?" opts={['a', 'b', 'c', 'd']} ans={1}
        why="b. The stress is changing K (temperature). Since the shift is right, K must increase." /></Part>
    </Prob>
  );
}

function P26() {
  return (
    <Prob num="26" mode="check">
      <p>For each reaction, (i) write an expression for Q, (ii) indicate what effect an increase in pressure would have on equilibrium.</p>
      <Part>
        <Choice q="a) H₂(g) + S(s) ⇌ H₂S(g): Q =" opts={[<Frac n="[H₂S]" d="[H₂]" />, <Frac n="[H₂S]" d="[H₂][S]" />]} ans={0} why="Q = [H₂S]/[H₂] (S is a solid)." />
        <div className="mt-2"><Choice q="Effect of increasing pressure" opts={SHIFT} ans={2} why="Unchanged (same moles gas on both sides)." /></div>
      </Part>
      <Part>
        <Choice q="b) H₂(g) + Br₂(l) ⇌ 2HBr(g): Q =" opts={[<Frac n="[HBr]²" d="[H₂][Br₂]" />, <Frac n="[HBr]²" d="[H₂]" />, <Frac n="2[HBr]" d="[H₂]" />]} ans={1} why="Q = [HBr]²/[H₂] (Br₂ is a pure liquid)." />
        <div className="mt-2"><Choice q="Effect of increasing pressure" opts={SHIFT} ans={0} why="Increase P, so system decreases P by shifting to side w/ fewer moles of gas (reactants: 1 vs 2)." /></div>
      </Part>
    </Prob>
  );
}

function P27() {
  return (
    <Prob num="27" mode="check">
      <p>For the reaction Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq), K = 890 at 25 °C.</p>
      <Part><Choice q="a) K = 500 at 60 °C. Is the reaction exothermic or endothermic?" opts={['Exothermic', 'Endothermic']} ans={0}
        why="K decreases when T increases (shift left), so heat is a product: exothermic." /></Part>
      <Part>
        <div className="q6-q">b) If 100.0 mL of 0.10 M Fe(NO₃)₃ are mixed with 100.0 mL of 0.20 M KSCN, what will the equilibrium concentrations of all three ions be at 25 °C?</div>
        <Num q="[FeSCN²⁺] =" ans={0.04892} unit="M" show="0.049" />
        <Num q="[Fe³⁺] =" ans={0.00108} unit="M" rel={0.06} show="0.0011" />
        <Num q="[SCN⁻] =" ans={0.0511} unit="M" show="0.051" />
      </Part>
      <Key>
        <p>For initial, note that we need to account for dilution (total diluted volume 200 mL): [Fe³⁺]ᵢ = 0.10 M (100 mL)/(200 mL) = 0.050 M; [SCN⁻]ᵢ = 0.20 M (100 mL)/(200 mL) = 0.10 M</p>
        <Eq>890 = <Frac n="x" d="(0.10 − x)(0.050 − x)" /></Eq>
        <p>Method? K is not small, so can't approx. Use quadratic or solver: 0.005 − 0.15112x + x² = 0, so x = 0.0489 or 0.1022 M (0.1022 causes conc. to be negative).</p>
        <p>[FeSCN²⁺] = x = 0.049 M; [Fe³⁺] = 0.050 − x = 0.0011 M; [SCN⁻] = 0.10 − x = 0.051 M. Check: Q = 0.049/((0.0011)(0.051)) = 873 ≈ 890 ✓</p>
      </Key>
    </Prob>
  );
}

// ---------- page ----------

function App() {
  return (
    <div>
      <h1>CHE 120 Quiz 6 Practice</h1>
      <p>"Step by step" problems walk through the method. Do the matching "On your own" problem next without help, then check the key.</p>
      <Ref />

      <Section title="Equilibrium expressions and calculating K"><P1 /><P2 /></Section>
      <Section title="Using K to find one unknown (no ICE table)"><P4 /><P3 /></Section>
      <Section title="Q vs. K"><P5 /><P6 /></Section>
      <Section title="Le Chatelier"><P7 /><P8 /></Section>
      <Section title="ICE tables"><P9 /><P10 /><P11 /><P12 /><P13 /></Section>
      <Section title="Acids and bases"><P14 /><P15 /><P16 /><P17 /><P18 /><P19 /><P20 /><P21 /><P22 /></Section>
      <Section title="Extra practice"><P23 /><P24 /><P25 /><P26 /><P27 /></Section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
