---
layout: vanillabootflex-fys.njk
title: Spotify and teachable machine!
tags: fys
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

  </style>

## Connect to Spotify!

To get full songs, not just 30 second previews, link your Spotify account here [Spotify Developer](https://developer.spotify.com/).

<label>Playlist:</label>
<input id="playlist" value="06gm4NGqh5XnwCaHF2Bg57"></input>
<button id="update-playlist">Update playlist</button>

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

<script>
function urlToURI(url) {
    let url_out = url.split("?")[0]
    url_out = url_out.split('/').slice(-2) // Just the uri
    return 'spotify:'+url_out[0]+':'+url_out[1];
}

function tmEvent(i) {
    return new CustomEvent("tmEvent", {
  detail: {class: i},
  bubbles: false,
  cancelable: true,
  composed: false,
    });
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '200',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };

      const callback = (EmbedController) => {
        // document.querySelectorAll('.episode').forEach(
        //   episode => {
        //     episode.addEventListener('click', () => {
        //         // Strip any query parameters off the url:
        //         let url = episode.value;
        //       EmbedController.loadUri(urlToURI(url));
        //     });
        //   })
        document.getElementById("play").addEventListener('click', () => {
            EmbedController.togglePlay();
        });

        document.getElementById("play").addEventListener('tmEvent', (event) => {
        const i = event.detail.class;
        const url = document.getElementById(`class-${i}-input`).value;
        EmbedController.loadUri(urlToURI(url));
        EmbedController.togglePlay();
        });
      };
      IFrameAPI.createController(element, options, callback);
    };

</script>