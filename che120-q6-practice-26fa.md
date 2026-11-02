---
title: CHE 120 Quiz 6 Practice
layout: vanillabootflex-full.njk
js: che120-q6-practice-26fa.js
---

<style>
  #app { max-width: 820px; margin: 0 auto 4rem; }
  .q6-section { margin-top: 2.5rem; border-top: 2px solid #333; padding-top: .5rem; }
  .q6-prob { border: 1px solid #ccc; border-radius: 6px; padding: 1rem 1.1rem; margin: 1.2rem 0; background: #fff; }
  .q6-prob h3 { font-size: 1.15rem; margin: 0 0 .5rem; }
  .q6-tag { font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; padding: .1rem .45rem; border-radius: 3px; margin-left: .5rem; vertical-align: middle; }
  .q6-tag.scaffold { background: #e3f0ff; color: #1a4d8f; }
  .q6-tag.own { background: #fff1d6; color: #7a4b00; }
  .q6-tag.check { background: #eee; color: #444; }
  .q6-step { border-left: 3px solid #9bb8dd; padding: .3rem 0 .3rem .8rem; margin: .7rem 0; }
  .q6-q { margin-bottom: .35rem; }
  .q6-opts { display: flex; flex-wrap: wrap; gap: .4rem; }
  .q6-opts button { text-align: left; }
  .q6-fb { margin-top: .35rem; padding: .35rem .6rem; border-radius: 4px; font-size: .95rem; }
  .q6-fb.right { background: #e5f6e8; border: 1px solid #9ad3a5; }
  .q6-fb.wrong { background: #fdeceb; border: 1px solid #efa8a3; }
  .q6-num input { width: 11rem; display: inline-block; }
  .q6-eq { text-align: center; margin: .5rem 0; font-size: 1.05rem; }
  .frac { display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; margin: 0 .15rem; }
  .frac > span:first-child { border-bottom: 1px solid currentColor; padding: 0 .2rem; }
  .frac > span:last-child { padding: 0 .2rem; }
  .q6-key { background: #f7f7f2; border: 1px dashed #bbb; padding: .6rem .8rem; margin-top: .6rem; }
  .q6-key p { margin-bottom: .4rem; }
  table.q6-tab td, table.q6-tab th { padding: .25rem .5rem; border: 1px solid #ddd; vertical-align: middle; }
  .q6-img { max-width: 100%; margin: .4rem 0; }
  details.q6-ref { background: #f4f6f9; padding: .5rem .8rem; border-radius: 4px; }
</style>

<div id="app"></div>
