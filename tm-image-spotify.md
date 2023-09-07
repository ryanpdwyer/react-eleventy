---
layout: vanillabootflex-fys.njk
title: Spotify and teachable machine!
tags: fys
js: tm-image-spotify.js
---

<style>
    .play {
      min-width: max-content;
      margin-bottom: .8rem;
      padding: .8rem 1rem;
      border-radius: 10px;
      border: 0;
      background: #191414;
      color: #fff;
      cursor: pointer;
    }

    .play:hover {
      background: #1Db954;
    }

    /* bold */
    .bold {
        font-weight: bold;
    }

  </style>



## Connect to Spotify!

<h2>Teachable Machine Image Model</h2>
<label>Model url:</label><input type="text" id="modelUrl" value="https://teachablemachine.withgoogle.com/models/DT8NSD58T/" size="50"/>
<br/>
<button type="button" id="start-button">Start</button>
<div id="webcam-container"></div>

<div id="label-container"></div>
</div>


To get full songs, not just 30 second previews, link your Spotify account here [Spotify Developer](https://developer.spotify.com/).

Put the link to the Spotify songs you want to use for each class here:

<img width="400" src="/img/spotify-song-url.jpg" alt="Spotify song url" />

<div class="form-group">
<label for="class-1-input">Class 1</label>
  <input class="episode form-control" value="https://open.spotify.com/track/6NFyWDv5CjfwuzoCkw47Xf"
  id="class-1-input"
  >
  </input>

  <label for="class-2-input">Class 2</label>
  <input class="episode form-control" id="class-2-input" value="episode:43cbJh4ccRD7lzM2730YK3">
  </input>

  <label>Class 3</label>
  <input class="episode form-control" value="episode:6I3ZzCxRhRkNqnQNo8AZPV">
  </input>
</div>

<div class="episodes">

<button class="play" id="play">Play / Pause</button>
</div>

<div id="embed-iframe"></div>

<script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.56/Tone.js" integrity="sha512-s5zatYPJj3QNve/aStVSAP4Y7/+44yX2wDYpa37YouB3WjKbQTXtK/eKhw24F6uVpaHofetU66ZeXFsyQnXjRA==" crossorigin="anonymous"></script>
<script type="text/javascript" src="/js/Tonejs-Instruments.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>