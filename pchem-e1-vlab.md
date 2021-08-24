---
layout: boot5.njk
title: P Chem Lab 4 - Project Choice
---

# L1: UV-Vis spectroscopy of an indicator

<div id="vlab">
</div>


<link href="https://nifty-newton-c83258.netlify.app/bundled/911.css" rel="stylesheet">
<script src="https://nifty-newton-c83258.netlify.app/bundled/850.js"></script>
<script src="https://nifty-newton-c83258.netlify.app/bundled/526.js"></script>
<script src="https://nifty-newton-c83258.netlify.app/bundled/911.js"></script>
<script src="https://nifty-newton-c83258.netlify.app/bundled/lib.js"></script>


<script>
        var data = {
            assignment: {
	"assignmentText" : "<em>Indicator<\/em>  Using the Virtual Laboratory, analyze the ferric thiocyanate equilibrium using Le Chatelier's principle."
},
            configuration: {
  "title": "Iron Thiocyanate Equilibrium",
    "solutionModellers": {
      "specificHeat": "solvent2"
  },
  "solutionViewers": [
	{
      "id": "solutionProperties",
      "displayDefault": true,
      "args": {
        "honorSignificantFigures": false
      }
    	},

        {
      "id": "aqueous",
      "displayDefault": true,
      "args": {
        "unitsToggleEnabled": true
      }
    },
    {
      "id": "solid",
      "displayDefault": true,
      "args": {
        "unitsToggleEnabled": true
      }
    },
    {
      "id": "spectrometer",
      "displayDefault": false
    },
    {
      "id": "particleView",
      "displayDefault": false
    },
    {
      "id": "thermometer",
      "displayDefault": true
    },
    {
      "id": "pH",
      "displayDefault": true
    },
    {
      "id": "vesselTrackingControl",
      "displayDefault": false
    }
  ],
  "transfer": ["precise", "significantFigures","realistic"]
},
            reactions: {
  "REACTIONS": {
    "REACTION": [
      {
        "SPECIES_REF": [
          {
            "id": "0",
            "coefficient": "-1"
          },
          {
            "id": "1",
            "coefficient": "1"
          },
          {
            "id": "2",
            "coefficient": "1"
          }
        ]
      },
	  {
        "SPECIES_REF": [
          {
            "id": 3,
            "coefficient": -1
          },
          {"id": 4,
          "coefficient": -1},
          {"id": 5,
          "coefficient": 1}
        ]
      },
      {
        "SPECIES_REF": [{"id": 3, "coefficient": -1},
 {"id": 0, "coefficient": -1},
 {"id": 8, "coefficient": 1},
 {"id": 1, "coefficient": 1}]
      },
      {
        "SPECIES_REF": [{"id": 100, "coefficient": -1},
 {"id": 1, "coefficient": 1},
 {"id": 101, "coefficient": 1}
 ]
      },
      {
      "SPECIES_REF": [{"id": 50, "coefficient": -1},
 {"id": 1, "coefficient": 1},
 {"id": 51, "coefficient": 1}
 ]
      }
    ]
  }
},
            solutions: {
   "FILESYSTEM": {
      "DIRECTORY": [
         {
            "name": "stockroom", 
            "SOLUTION": [
               {
                  "name": "Distilled H<sub>2</sub>O", 
                  "description": "Distilled Water", 
                  "volume": "3.0", 
                  "vessel": "3LCarboy",
                  "species": [
                     {
                        "id": 0
                     }
                  ]
               },
               {
                 "name": "1.0 M HNO<sub>3</sub>",
                 "description": "1.0 M Nitric acid",
                 "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 1, "amount": 0.1},
                 {"id": 6, "amount": 0.1}
                 ]
               },
               {
                 "name": "10.0 M HNO<sub>3</sub>",
                 "description": "10.0 M Nitric acid",
                 "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 1, "amount": 1.0},
                 {"id": 6, "amount": 1.0}
                 ]
               },
                {
                 "name": "1.0 M KOH",
                 "description": "1.0 M KOH",
                 "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 2, "amount": 0.1},
                 {"id": 7, "amount": 0.1}
                 ]
               },
               {
                 "name": "10.0 M KOH",
                 "description": "10.0 M KOH",
                 "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 2, "amount": 1.0},
                 {"id": 7, "amount": 1.0}
                 ]
               },
               {"name": "1.0 mM Nile Blue chloride",
               "description": "1.0 mM Nile Blue chloride",
                "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 100, "amount": 0.1*1e-3},
                 {"id": 9, "amount": 0.1*1e-3}
                 ]
               },
                {"name": "0.10 M NH<sub>3</sub>",
               "description": "0.10 M ammonia",
                "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 51, "amount": 0.1*0.1},
                 ]
               },
            ]
         }
      ]
   }
},
            species: {
    "SPECIES_LIST": {
        "SPECIES": [
            {
                "id": 0,
                "name": "H<sub>2</sub>O",
                "enthalpy": -285.83,
                "entropy": 69.91,
                "state": "l",
                "molecularWeight": 18.016
            },
            {
                "id": 1,
                "name": "H<sup>+</sup>",
                "enthalpy": 0.0,
                "entropy": 0.0,
                "molecularWeight": 1.008
            },
            {
                "id": 2,
                "name": "OH<sup>-</sup>",
                "enthalpy": -229.99,
                "entropy": -10.75,
                "molecularWeight": 17.008
            },
            {
                "id": 3,
                "name": "Fe<sup>3+</sup>",
                "simpleName": "Fe3+",
                "state": "aq",
                "enthalpy": -48.5,
                "entropy": -315.9,
                "density": 3,
                "specificHeat": 0.0,
                "molecularWeight": 55.845,
                "hue": 44.0,
                "saturation": 72.0,
                "value": 96.0,
                "colorConcentration": 0.1
            },
            {
                "id": 4,
                "name": "SCN<sup>-</sup>",
                "simpleName": "SCN-",
                "state": "aq",
                "enthalpy": 76.4,
                "entropy": 144.3,
                "density": 3,
                "specificHeat": -0.165,
                "molecularWeight": 58.08
            },
            {
                "id": 5,
                "name": "FeSCN<sup>2+</sup>",
                "simpleName": "FeSCN2+",
                "state": "aq",
                "enthalpy": 31.25,
                "entropy": -119.0,
                "density": 6,
                "specificHeat": -0.165,
                "molecularWeight": 113.925,
                "hue": 0.0,
                "saturation": 98.0,
                "value": 54.0,
                "colorConcentration": 0.001
            },
            {
                "id": 6,
                "name": "NO<sub>3</sub><sup>-</sup>",
                "simpleName": "NO3-",
                "state": "aq",
                "enthalpy": -207.4,
                "entropy": 146.4,
                "density": 3,
                "specificHeat": -0.333810663,
                "molecularWeight": 62.0049
            },
            {
                "id": 7,
                "name": "K<sup>+</sup>",
                "simpleName": "K+",
                "state": "aq",
                "enthalpy": -252.4,
                "entropy": 102.5,
                "density": 3,
                "specificHeat": 0.133262189,
                "molecularWeight": 39.0983
            },
            {
                "id": 8,
                "name": "FeOH<sup>2+</sup>",
                "simpleName": "FeOH2+",
                "state": "aq",
                "enthalpy": -290.8,
                "entropy": -142.0,
                "density": 4,
                "specificHeat": 0.0,
                "molecularWeight": 72.852
            },
            {
                "id": 9,
                "name": "Cl<sup>-</sup>",
                "simpleName": "Cl-",
                "state": "aq",
                "enthalpy": -167.2,
                "entropy": 56.5,
                "density": 3,
                "specificHeat": -136.4/(4.184*35.453),
                "molecularWeight": 35.453
            },
            {
                "id": 50,
                "name": "NH<sub>4</sub><sup>+</sup>",
                "simpleName": "NH4+",
                "state": "aq",
                "enthalpy": -132.5,
                "entropy": 113.4,
                "density": 3,
                "specificHeat": 79.9/(4.184*18.039),
                "molecularWeight": 18.039
            },
            {
                "id": 51,
                "name": "NH<sub>3</sub>",
                "simpleName": "NH3",
                "state": "aq",
                "enthalpy": -80.29,
                "entropy": 111.3,
                "density": 3,
                "specificHeat": 0/(4.184*17.031),
                "molecularWeight": 17.031
            },

            {
                "id": 100,
                "name": "Nile blue cation",
                "simpleName": "NB+",
                "state": "aq",
                "enthalpy": 0,
                "entropy": 0,
                "density": 3,
                "specificHeat": 0,
                "molecularWeight": 318.4,
                "hue": 232.0,
                "saturation": 74.0,
                "value": 92.0,
                "colorConcentration": 0.0001
            },
            {
                "id": 101,
                "name": "Nile blue",
                "simpleName": "NB",
                "state": "aq",
                "enthalpy": 5.76*9.7,
                "entropy": 0,
                "density": 3,
                "specificHeat": 0,
                "molecularWeight": 317.4,
                "hue": 0.0,
                "saturation": 76.0,
                "value": 92.0,
                "colorConcentration": 0.0001
            },
        ]
    }
},
            spectra: {
   "SPECTRA_LIST": {
      "SPECIES": [
         {
            "id": "100", 
            "BAND": [{
               "wavelength": 635, 
               "width": 100, 
               "e": 1e4
            }]
         }, 
         {
            "id": "101", 
            "BAND": [{
               "wavelength": 522, 
               "width": 100, 
               "e": 1e4,
            }]
         }
      ]
   }
}
        };

  const language = 'en';
  const allowLoadAssignment = false;
  const showFirstTimeTips = false;
  const appModel = new VLab.AppModel();
  const appView = new VLab.AppView({ model: appModel,
  el: document.getElementById("vlab"),
  vlab: data,
  domain: "https://chemcollective.oli.cmu.edu/chem/jsvlab/"});
  </script>
