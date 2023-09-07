
let model, webcam, ctx, labelContainer, maxPredictions, previousClass, samples, current;

previousClass = -1;

let initialized = false;

async function init() {
    if (initialized) {
        return;
    }
    initialized = true;
    const URL = document.getElementById("modelUrl").value;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

document.getElementById("start-button").addEventListener("click", init);

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

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
        EmbedController.play();
        });
      };
      IFrameAPI.createController(element, options, callback);
    };


async function predict() {
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(webcam.canvas);

    let pMax = 0;
    let iMax = 0;
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        if (prediction[i].probability > pMax) {
            iMax = i;
            pMax = prediction[i].probability;
        }
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    for (let i = 0; i < maxPredictions; i++) {
        if (i == iMax) {
            labelContainer.childNodes[i].classList.add('bold');
        }
        else {
            labelContainer.childNodes[i].classList.remove('bold');
        }
    }
    

    if (iMax != previousClass) {
        previousClass = iMax;
        document.getElementById("play").dispatchEvent(tmEvent(iMax+1));
    }
}