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

Put your model url here.

<label>Model url:</label><input type="text" id="modelUrl" value="https://teachablemachine.withgoogle.com/models/DT8NSD58T/" size="70"/>
<br/>
<button type="button" id="start-button">Start</button>
<div id="webcam-container"></div>

<div id="label-container"></div>
</div>


<button class="play" id="play">Play / Pause</button>
</div>

<div id="embed-iframe"></div>


### Spotify songs

To get full songs, not just 30 second previews, link your Spotify account here [Spotify Developer](https://developer.spotify.com/) and/or login to spotify above.


<div class="form-group">
<label for="class-1-input">Class 1</label>
  <input class="episode form-control" value="https://open.spotify.com/track/0ccCwNzXvr1Yoz91vKz31Z?si=32ea5f929a47439e"
  id="class-1-input"
  >
  </input>

  <label for="class-2-input">Class 2</label>
  <input class="episode form-control" id="class-2-input" value="https://open.spotify.com/track/5UwxXr09qj5qVRicg94pQn?si=c1738972d9b94939">
  </input>

  <label>Class 3</label>
  <input class="episode form-control" value="https://open.spotify.com/track/5Zsr1AWKUcxDGMlIaDXFru?si=f4928d9e1e0d4335">
  </input>
</div>

Put the link to the Spotify songs you want to use for each class here (I used AI / robot themed songs initially). To choose a song, use the share menu on spotify:

<img width="400" src="/img/spotify-song-url.jpg" alt="Spotify song url" />


<script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>