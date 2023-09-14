
let model, webcam, ctx, labelContainer, maxPredictions, previousClass, samples, current;

previousClass = -1;

let initialized = false;

let initialTimestamp = null;
let classChangeTimestamp = null;

let classSeekPositions = {};

window.classSeekPositions = classSeekPositions;

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
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    for (let i = 0; i < maxPredictions; i++) {
        classSeekPositions[i] = 0;
    };

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    // append/get elements to the DOM
    // document.getElementById("webcam-container").appendChild(webcam.canvas);
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    window.requestAnimationFrame(loop);

}

document.getElementById("start-button").addEventListener("click", init);

async function loop(timestamp) {
    if (initialTimestamp == null) {
        initialTimestamp = timestamp;
        classChangeTimestamp = timestamp;
    }
    webcam.update(); // update the webcam frame
    await predict(timestamp);
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
        // EmbedController.seek(Math.round(classSeekPositions[i-1]/1000.0));
        EmbedController.play();
        });
      };
      IFrameAPI.createController(element, options, callback);
    };


async function predict(timestamp) {
    // Prediction 2: run input through teachable machine classification model
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

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
        if (previousClass != -1) {
            classSeekPositions[previousClass] += timestamp - classChangeTimestamp;
        }
        classChangeTimestamp = timestamp;
        previousClass = iMax;
        document.getElementById("play").dispatchEvent(tmEvent(iMax+1));
    }

    //  finally draw the poses
    drawPose(pose);
}


// Save the state of all input elements to localStorage
function saveState() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      localStorage.setItem(input.id, input.value);
    });
  }

  function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}
  
  // Load the state of all input elements from localStorage
  function loadState() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      const value = localStorage.getItem(input.id);
      if (value !== null) {
        input.value = value;
      }
    });
  }
  
  // Call saveState() whenever an input element changes
  document.addEventListener('input', saveState);
  
  // Call loadState() when the page loads
  window.addEventListener('load', loadState);

// New
//    async function init() {
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         // load the model and metadata
//         // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
//         // Note: the pose library adds a tmPose object to your window (window.tmPose)
//         model = await tmPose.load(modelURL, metadataURL);
//         maxPredictions = model.getTotalClasses();

//         // Convenience function to setup a webcam
//         const size = 200;
//         const flip = true; // whether to flip the webcam
//         webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
//         await webcam.setup(); // request access to the webcam
//         await webcam.play();
//         window.requestAnimationFrame(loop);

//         // append/get elements to the DOM
//         const canvas = document.getElementById("canvas");
//         canvas.width = size; canvas.height = size;
//         ctx = canvas.getContext("2d");
//         labelContainer = document.getElementById("label-container");
//         for (let i = 0; i < maxPredictions; i++) { // and class labels
//             labelContainer.appendChild(document.createElement("div"));
//         }
//     }

//     async function loop(timestamp) {
//         webcam.update(); // update the webcam frame
//         await predict();
//         window.requestAnimationFrame(loop);
//     }

//     async function predict() {
//         // Prediction #1: run input through posenet
//         // estimatePose can take in an image, video or canvas html element
        // const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // // Prediction 2: run input through teachable machine classification model
        // const prediction = await model.predict(posenetOutput);

//         for (let i = 0; i < maxPredictions; i++) {
//             const classPrediction =
//                 prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//             labelContainer.childNodes[i].innerHTML = classPrediction;
//         }

//         // finally draw the poses
//         drawPose(pose);
//     }



