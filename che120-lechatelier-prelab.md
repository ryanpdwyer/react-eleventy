---
title: E6 Prelab
layout: vanillabootflex-vlab.njk
js: che120-e6-23.js
---

<style>
    .hidden {
        display: none;
    }
</style>



<script>

function getCurrentVessel(appView) {
    var currentWorkbenchCid = appView.model.get("currentWorkbenchCid");
    var workbenchCollection = appView.model.get("workbenches");
    var workbench = workbenchCollection.get(currentWorkbenchCid);
    var currentVesselCid = workbench.get("currentVesselCid");
    var vesselCollection = workbench.get("vesselCollection");
    var vessel = vesselCollection.get(currentVesselCid);
    return vessel;
    }

        // Synchronous load of the activity list contained in output.json - use browser methods, not jQuery

        function showVlabHidePlaceholder(vlab_placeholder, vlab_el) {
            vlab_placeholder.classList.add("hidden");
            vlab_el.classList.remove("hidden");
        }
        const language = 'en';
        const allowLoadAssignment = false;
        const showFirstTimeTips = false;
        let appModel = new VLab.AppModel();
        let appView = null;
        let data;

        window.addEventListener("load", function() {
        const vlab_placeholder = document.getElementById("vlab-placeholder");
        const vlab_el = document.getElementById("vlab");
        showVlabHidePlaceholder(vlab_placeholder, vlab_el);
        appView = new VLab.AppView({ model: appModel,
                                           el: vlab_el,
                                           vlab: window.data,
                                           domain: "https://chemcollective.org/chem/jsvlab/"});
        });
</script>

## Experiment 6 Prelab

<div id="youtube-placeholder" style="width:640px; height:540px; background-color: #f2f2f2; display: flex; justify-content: center; align-items: center;">
<p style="font-size: 24px; color: #999;">YouTube video (about 1 minute) will be displayed here after it is created.</p>
</div>

To see what to do, use your pre-lab handout and/or follow along with the questions below.

<div id="vlab-placeholder" style="width:800px; height:600px; background-color: #f2f2f2; display: flex; justify-content: center; align-items: center;">
<p style="font-size: 24px; color: #999;">Virtual lab will be displayed here after it is loaded.</p>
</div>
<div id="vlab" style="height:650px; width: 950px;" class="hidden"></div>


<div id="questions"></div>