
// const language = 'en';
// const allowLoadAssignment = false;
// const showFirstTimeTips = false;

function getCurrentVessel(appView) {
    var currentWorkbenchCid = appView.model.get("currentWorkbenchCid");
    var workbenchCollection = appView.model.get("workbenches");
    var workbench = workbenchCollection.get(currentWorkbenchCid);
    var currentVesselCid = workbench.get("currentVesselCid");
    var vesselCollection = workbench.get("vesselCollection");
    var vessel = vesselCollection.get(currentVesselCid);
    return vessel;
    }

    function printVesselContents(appView) {
    if (appView) {
      const vessel = getCurrentVessel(appView);
      if (vessel) {
      const attr = vessel.attributes;
      const T_celsius = attr.temperature - 273.15;
      const species = attr.solution.speciesInSolution;
      const kb = Object.fromEntries(attr.kb.species.map( x=> [x.id, x.name]));
      const volume = attr.volume;
      const molarities = species.filter(s => s.archetype.state == 'aq').map((s) => `[${kb[s.archetype.id]}] = ${(s.moles / volume).toPrecision(3)} M`);
      const molarities_string = molarities.join(", ");

      const grams = species.filter(s => s.archetype.state == 's').map((s) => `${kb[s.archetype.id]} = ${(s.moles * s.archetype.molecularWeight).toPrecision(3)} g`);
    
      let grams_string = "";
      if (grams.length > 0) {
        grams_string = ". Solids: "+grams.join(", ");
      }

      return `Solution Name: ${attr.name}, V=${attr.volumeString}, T=${T_celsius.toFixed(2)} °C, pH=${attr.pH.toFixed(2)}. ` +molarities_string + grams_string;
      }
    } else {
      return "Virtual lab not loaded yet."
    }
  }

      

// Call this function to set the text of the vlab-text element in a loop every 5 seconds
function updateVlabText() {
  const vlab_text = document.getElementById("vlab-text");
    const text = printVesselContents(window.appView);
    vlab_text.innerHTML = text;
    window.setTimeout(updateVlabText, 2000);
}

// Add a button next to the vlab-text element that copies the text to the clipboard
function addCopyButton() {
  const vlab_text = document.getElementById("vlab-text");
  const button = document.createElement("button");
  button.innerHTML = "Copy";
  button.onclick = function() {
    navigator.clipboard.writeText(vlab_text.innerHTML);
  }
  vlab_text.parentNode.insertBefore(button, vlab_text.nextSibling);
}

// Call this function to update the text of the vlab-text element once
updateVlabText();