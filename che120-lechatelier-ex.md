---
title: E6 Prelab
layout: vanillabootflex-vlab24.njk
js: che120-lechat-24fa.js
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

## Le Chatelier Example

For help changing the temperature, see the animation below.

<button id='top-button-gif' onclick="toggleAnimation('animation', 'top-button-gif')">Hide Animation</button>

<script>
function toggleAnimation(id, buttonId) {
    const animationDiv = document.getElementById(id);
    const button = document.getElementById(buttonId);
    if (animationDiv.style.display === "none") {
        animationDiv.style.display = "block";
        button.textContent = "Hide Animation";
    } else {
        animationDiv.style.display = "none";
        button.textContent = "Show Animation";
    }
}
</script>

<div id="animation">
<img src="/img/vlab-change-temp-slower.gif" alt="Change Temperature Animation" width="400px" />
</div>

The balanced equation for the exothermic reaction is
 3A(aq) + 2B(g) ⇌ C(s) + D(aq).

The product D is a red color - all other species are colorless.

<div id="vlab-placeholder" style="width:800px; height:600px; background-color: #f2f2f2; display: flex; justify-content: center; align-items: center;">
<p style="font-size: 24px; color: #999;">Virtual lab will be displayed here after it is loaded.</p>
</div>
<div id="vlab" style="height:650px; width: 950px;" class="hidden"></div>

<div id="questions"></div>