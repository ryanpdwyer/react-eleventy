// Purple Raider Commencement Market 2026 — shared config + helpers.
// Loaded by /commencement-2026.html and /commencement-count.html.

const COMMENCEMENT = (function () {
  // ===== CONFIG — fill these in before the ceremony =====
  const CONFIG = {
    // From console.firebase.google.com → Project settings → Your apps → Web (Config snippet).
    // Until apiKey + databaseURL are set, the page falls back to localStorage (single-device only).
    firebase: {
      apiKey: "TODO",
      authDomain: "TODO",
      databaseURL: "TODO",
      projectId: "TODO",
    },
    // Form responses sheet → File → Share → Publish to web → CSV → paste URL here.
    sheetCsvUrl: "TODO",
    // Ceremony start (Eastern Time) and duration in minutes.
    ceremonyStart: new Date("2026-05-09T13:30:00-04:00"),
    durationMin: 90,
    // Firebase root key for this event (lets you reuse the project for future years).
    rootKey: "commencement2026",
  };

  // phase: "speech" = active from ceremony start until first grad crosses (the
  // launch value). "walk" = active from launch until ceremony end. "launch" =
  // single timing event.
  const CATEGORIES = [
    { id: "journey",  emoji: "\u{1F5E3}\u{FE0F}", title: "Journey Index",           threshold: 2.5,  phase: "speech", columnHint: "Journey",            description: "Times \"Journey\" said by a speaker" },
    { id: "launch",   emoji: "\u{1F680}",         title: "Time to Launch",          threshold: 16.5, phase: "launch", columnHint: "Time to Launch",     description: "Min from 1:30pm ET to first grad crossing", type: "launch" },
    { id: "footwear", emoji: "\u{1F7E3}",         title: "Purple Footprint",        threshold: 52.5, phase: "walk",   columnHint: "Purple Footprint",   description: "Grads with any purple footwear" },
    { id: "family",   emoji: "\u{1F46A}",         title: "Family Volume Index",     threshold: 57.5, phase: "walk",   columnHint: "Family Volume",      description: "Family shouts during name read" },
    { id: "platform", emoji: "\u{1F57A}",         title: "Platform Energy",         threshold: 15.5, phase: "walk",   columnHint: "Platform Energy",    description: "Grad celebrates on platform" },
    { id: "hugs",     emoji: "\u{1F917}",         title: "Diploma Diplomacy",       threshold: 14.5, phase: "walk",   columnHint: "Diploma Diplomacy",  description: "Grad hugs platform party member" },
    { id: "noise",    emoji: "\u{1F50A}",         title: "Unauthorized Audio",      threshold: 0.5,  phase: "walk",   columnHint: "Unauthorized Audio", description: "Artificial noise maker used" },
    { id: "phone",    emoji: "\u{1F4F1}",         title: "Phone-on-Stage",          threshold: 0.5,  phase: "walk",   columnHint: "Phone-on-Stage",     description: "Grad with phone on stage" },
  ];

  // Priors over ceremony timing (overridden by observed values when available).
  const TIMING_PRIORS = {
    launchMean: 16.5,        // expected min from 1:30pm to first grad
    launchSd: 3,             // uncertainty on the launch time before it's recorded
    ceremonyEndSd: 10,       // 80% range for total duration is roughly 90 ± 13 min
  };

  function isFirebaseConfigured() {
    const f = CONFIG.firebase;
    return f && f.apiKey && f.apiKey !== "TODO" && f.databaseURL && f.databaseURL !== "TODO";
  }

  function elapsedMinutes(now) {
    return ((now == null ? Date.now() : now) - CONFIG.ceremonyStart.getTime()) / 60000;
  }

  function elapsedFraction(now) {
    return Math.min(1, Math.max(0, elapsedMinutes(now) / CONFIG.durationMin));
  }

  // ===== Sampling primitives =====

  function sampleNormal(mean, sd) {
    const u1 = Math.random() || 1e-12;
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + sd * z;
  }

  function samplePoisson(lambda) {
    if (!isFinite(lambda) || lambda <= 0) return 0;
    if (lambda > 30) {
      // Normal approximation with continuity correction.
      const x = sampleNormal(lambda, Math.sqrt(lambda));
      return Math.max(0, Math.round(x));
    }
    // Knuth's method.
    const L = Math.exp(-lambda);
    let k = 0, p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }

  // Per-iteration Monte Carlo sample of ceremony timing.
  function sampleCeremony(state, now) {
    const elapsedMin = elapsedMinutes(now);
    const launchDone = !!(state.done && state.done.launch);
    let launchValue;
    if (launchDone) {
      launchValue = (state.counts && state.counts.launch) != null ? state.counts.launch : TIMING_PRIORS.launchMean;
    } else {
      // Prior on launch, conditioned on the fact that launch hasn't happened
      // yet if we're still observing — so it must be at least the current
      // elapsed time.
      const sampled = sampleNormal(TIMING_PRIORS.launchMean, TIMING_PRIORS.launchSd);
      launchValue = elapsedMin > 0 ? Math.max(elapsedMin, sampled) : Math.max(0, sampled);
    }
    const endSampled = sampleNormal(CONFIG.durationMin, TIMING_PRIORS.ceremonyEndSd);
    const ceremonyEnd = Math.max(elapsedMin + 0.1, launchValue + 0.5, endSampled);
    return { elapsedMin: elapsedMin, launchValue: launchValue, ceremonyEnd: ceremonyEnd };
  }

  function phaseWindow(category, ceremony) {
    if (category.phase === "speech") {
      return { start: 0, end: ceremony.launchValue };
    }
    if (category.phase === "walk") {
      return { start: ceremony.launchValue, end: ceremony.ceremonyEnd };
    }
    return { start: 0, end: ceremony.ceremonyEnd };
  }

  // Draw one sample of the final count for a category.
  function sampleFinalCount(category, state, ceremony) {
    const id = category.id;
    const done = !!(state.done && state.done[id]);
    const count = (state.counts && state.counts[id]) || 0;
    if (done) return count;
    if (category.type === "launch") {
      return ceremony.launchValue;
    }
    const w = phaseWindow(category, ceremony);
    const total = Math.max(0.1, w.end - w.start);
    const elapsedInPhase = Math.max(0, Math.min(ceremony.elapsedMin - w.start, total));
    const f = elapsedInPhase / total;
    if (f >= 1) {
      // Active phase is over but category not marked done — assume final = count.
      return count;
    }
    // Bayesian Poisson with Gamma(α=T/2, β=0.5) prior on events-per-active-phase
    // so the prior is calibrated to each category's threshold.
    const alpha = category.threshold / 2;
    const beta = 0.5;
    const lambdaRem = ((alpha + count) * (1 - f)) / (beta + f);
    return count + samplePoisson(lambdaRem);
  }

  // Generate Monte Carlo samples of the final state. Each sample contains a
  // jointly-consistent realization of launch time, ceremony end, and final
  // counts for every category.
  function sampleFinals(state, now, n) {
    n = n || 1500;
    const samples = new Array(n);
    for (let i = 0; i < n; i++) {
      const ceremony = sampleCeremony(state, now);
      const finals = {};
      for (const cat of CATEGORIES) {
        finals[cat.id] = sampleFinalCount(cat, state, ceremony);
      }
      samples[i] = finals;
    }
    return samples;
  }

  // P(final > threshold) for a category, estimated from MC samples.
  function pOverFromSamples(samples, category) {
    let n = 0;
    for (let i = 0; i < samples.length; i++) {
      if (samples[i][category.id] > category.threshold) n++;
    }
    return n / samples.length;
  }

  // Score a player using shared MC samples. Returns {expected, lo, hi} where
  // lo/hi are the 10th/90th percentiles of the score distribution (80% band).
  function scorePlayerFromSamples(picks, samples) {
    const N = samples.length;
    const totals = new Array(N);
    for (let i = 0; i < N; i++) {
      const finals = samples[i];
      let score = 0;
      for (const cat of CATEGORIES) {
        const pick = picks[cat.id];
        if (!pick) continue;
        const isOver = finals[cat.id] > cat.threshold;
        if ((pick === "over" && isOver) || (pick === "under" && !isOver)) score++;
      }
      totals[i] = score;
    }
    let mean = 0;
    for (let i = 0; i < N; i++) mean += totals[i];
    mean /= N;
    totals.sort(function (a, b) { return a - b; });
    const lo = totals[Math.floor(0.1 * N)];
    const hi = totals[Math.min(N - 1, Math.floor(0.9 * N))];
    return { expected: mean, lo: lo, hi: hi };
  }

  // Minimal CSV parser (handles quoted fields, embedded newlines, doubled quotes).
  function parseCsv(text) {
    const rows = [];
    let row = [], cell = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; } else inQuotes = false;
        } else cell += c;
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ",") { row.push(cell); cell = ""; }
        else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
        else if (c === "\r") { /* skip */ }
        else cell += c;
      }
    }
    if (cell.length > 0 || row.length > 0) { row.push(cell); rows.push(row); }
    return rows;
  }

  // Parse Form responses CSV into [{name, picks: {catId: 'over'|'under'}}].
  function parsePredictions(csvText) {
    const rows = parseCsv(csvText);
    if (rows.length < 2) return [];
    const headers = rows[0];
    let nameIdx = headers.findIndex(function (h) { return /name/i.test(h); });
    if (nameIdx < 0) nameIdx = 1;
    const catColIdx = {};
    for (const cat of CATEGORIES) {
      const hint = cat.columnHint.toLowerCase();
      const idx = headers.findIndex(function (h) { return (h || "").toLowerCase().indexOf(hint) >= 0; });
      if (idx >= 0) catColIdx[cat.id] = idx;
    }
    const players = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const name = (row[nameIdx] || "").trim();
      if (!name) continue;
      const picks = {};
      for (const cat of CATEGORIES) {
        const idx = catColIdx[cat.id];
        if (idx == null) continue;
        const val = (row[idx] || "").toLowerCase();
        if (val.indexOf("over") >= 0) picks[cat.id] = "over";
        else if (val.indexOf("under") >= 0) picks[cat.id] = "under";
      }
      players.push({ name: name, picks: picks });
    }
    return players;
  }

  async function loadPredictions() {
    if (!CONFIG.sheetCsvUrl || CONFIG.sheetCsvUrl === "TODO") return [];
    const res = await fetch(CONFIG.sheetCsvUrl, { cache: "no-store" });
    if (!res.ok) throw new Error("Sheet fetch failed: " + res.status);
    const text = await res.text();
    return parsePredictions(text);
  }

  // ===== Backends =====

  function makeFirebaseBackend() {
    if (!window.firebase || !window.firebase.initializeApp) {
      throw new Error("Firebase compat SDK not loaded.");
    }
    if (!firebase.apps.length) firebase.initializeApp(CONFIG.firebase);
    const db = firebase.database();
    const root = db.ref(CONFIG.rootKey);
    return {
      kind: "firebase",
      onState: function (cb) {
        root.on("value", function (snap) {
          const v = snap.val() || {};
          cb({ counts: v.counts || {}, done: v.done || {} });
        });
      },
      setCount: function (catId, n) { return root.child("counts/" + catId).set(n); },
      incCount: function (catId, delta) {
        return root.child("counts/" + catId).transaction(function (v) {
          const next = (v || 0) + delta;
          return next < 0 ? 0 : next;
        });
      },
      setDone: function (catId, isDone) { return root.child("done/" + catId).set(!!isDone); },
    };
  }

  function makeLocalBackend() {
    const KEY = CONFIG.rootKey + ":state";
    const listeners = [];
    function read() {
      try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) { return {}; }
    }
    function write(s) {
      localStorage.setItem(KEY, JSON.stringify(s));
      const norm = normalize(s);
      for (const cb of listeners) cb(norm);
    }
    function normalize(s) { return { counts: s.counts || {}, done: s.done || {} }; }
    window.addEventListener("storage", function (e) {
      if (e.key === KEY) {
        const norm = normalize(read());
        for (const cb of listeners) cb(norm);
      }
    });
    return {
      kind: "local",
      onState: function (cb) { listeners.push(cb); cb(normalize(read())); },
      setCount: function (catId, n) { const s = read(); s.counts = s.counts || {}; s.counts[catId] = n; write(s); },
      incCount: function (catId, delta) {
        const s = read();
        s.counts = s.counts || {};
        const next = (s.counts[catId] || 0) + delta;
        s.counts[catId] = next < 0 ? 0 : next;
        write(s);
      },
      setDone: function (catId, isDone) { const s = read(); s.done = s.done || {}; s.done[catId] = !!isDone; write(s); },
    };
  }

  function createBackend() {
    return isFirebaseConfigured() ? makeFirebaseBackend() : makeLocalBackend();
  }

  function categoryById(id) {
    return CATEGORIES.find(function (c) { return c.id === id; });
  }

  return {
    CONFIG: CONFIG,
    CATEGORIES: CATEGORIES,
    TIMING_PRIORS: TIMING_PRIORS,
    categoryById: categoryById,
    isFirebaseConfigured: isFirebaseConfigured,
    elapsedMinutes: elapsedMinutes,
    elapsedFraction: elapsedFraction,
    sampleFinals: sampleFinals,
    pOverFromSamples: pOverFromSamples,
    scorePlayerFromSamples: scorePlayerFromSamples,
    parseCsv: parseCsv,
    parsePredictions: parsePredictions,
    loadPredictions: loadPredictions,
    createBackend: createBackend,
  };
})();
