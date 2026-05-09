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

  const CATEGORIES = [
    { id: "journey",  emoji: "\u{1F5E3}\u{FE0F}", title: "Journey Index",           threshold: 2.5,  columnHint: "Journey",            description: "Times \"Journey\" said by a speaker" },
    { id: "launch",   emoji: "\u{1F680}",         title: "Time to Launch",          threshold: 16.5, columnHint: "Time to Launch",     description: "Min from 1:30pm ET to first grad crossing", type: "launch" },
    { id: "footwear", emoji: "\u{1F7E3}",         title: "Purple Footprint",        threshold: 52.5, columnHint: "Purple Footprint",   description: "Grads with any purple footwear" },
    { id: "family",   emoji: "\u{1F46A}",         title: "Family Volume Index",     threshold: 57.5, columnHint: "Family Volume",      description: "Family shouts during name read" },
    { id: "platform", emoji: "\u{1F57A}",         title: "Platform Energy",         threshold: 15.5, columnHint: "Platform Energy",    description: "Grad celebrates on platform" },
    { id: "hugs",     emoji: "\u{1F917}",         title: "Diploma Diplomacy",       threshold: 14.5, columnHint: "Diploma Diplomacy",  description: "Grad hugs platform party member" },
    { id: "noise",    emoji: "\u{1F50A}",         title: "Unauthorized Audio",      threshold: 0.5,  columnHint: "Unauthorized Audio", description: "Artificial noise maker used" },
    { id: "phone",    emoji: "\u{1F4F1}",         title: "Phone-on-Stage",          threshold: 0.5,  columnHint: "Phone-on-Stage",     description: "Grad with phone on stage" },
  ];

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

  // Poisson CDF P(X <= k).
  function poissonCdf(k, lambda) {
    if (lambda <= 0) return 1;
    if (k < 0) return 0;
    let sum = 0, term = Math.exp(-lambda);
    for (let i = 0; i <= k; i++) {
      sum += term;
      term *= lambda / (i + 1);
    }
    return Math.min(1, sum);
  }

  // P(final count > threshold) given current count, doneness, and elapsed time.
  // Constant-rate model with a Gamma(α=T/2, β=0.5) prior on events-per-ceremony
  // so the prior is calibrated to each category's threshold (otherwise a single
  // prior either dominates the small categories or the large ones).
  function pOverFinal(category, count, done, now) {
    const T = category.threshold;
    if (done) return count > T ? 1 : 0;
    if (category.type === "launch") {
      return 0.5;
    }
    const elapsedMin = elapsedMinutes(now);
    if (elapsedMin <= 0) return 0.5;
    const f = Math.min(1, elapsedMin / CONFIG.durationMin);
    if (f >= 1) return count > T ? 1 : 0;
    const alpha = T / 2;
    const beta = 0.5;
    const lambda = ((alpha + count) * (1 - f)) / (beta + f);
    const kThresh = Math.ceil(T) - Math.floor(count) - 1;
    if (kThresh < 0) return 1;
    return 1 - poissonCdf(kThresh, lambda);
  }

  // Score a player. picks: {catId: 'over'|'under'}. state: {counts, done}.
  function scorePlayer(picks, state, now) {
    let expected = 0, variance = 0;
    const perCategory = [];
    for (const cat of CATEGORIES) {
      const count = (state.counts && state.counts[cat.id]) || 0;
      const done = !!(state.done && state.done[cat.id]);
      const pOver = pOverFinal(cat, count, done, now);
      const pick = picks[cat.id];
      let pCorrect = 0;
      if (pick === "over") pCorrect = pOver;
      else if (pick === "under") pCorrect = 1 - pOver;
      expected += pCorrect;
      variance += pCorrect * (1 - pCorrect);
      perCategory.push({ catId: cat.id, pOver: pOver, pick: pick, pCorrect: pCorrect, done: done });
    }
    return { expected: expected, variance: variance, sd: Math.sqrt(variance), perCategory: perCategory };
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
    categoryById: categoryById,
    isFirebaseConfigured: isFirebaseConfigured,
    elapsedMinutes: elapsedMinutes,
    elapsedFraction: elapsedFraction,
    pOverFinal: pOverFinal,
    scorePlayer: scorePlayer,
    parseCsv: parseCsv,
    parsePredictions: parsePredictions,
    loadPredictions: loadPredictions,
    createBackend: createBackend,
  };
})();
