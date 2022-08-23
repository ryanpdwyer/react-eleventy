---
layout: boot5.njk
title: P Chem Lab 4 - Project Choice
---

# L1: UV-Vis spectroscopy of an indicator

This page shows the lab experiment in a virtual lab environment.

<div id="vlab">
</div>


<script defer="defer" src="https://6304b336932f81000908fc39--melodious-granita-c9c445.netlify.app/850-3137d0eefbbd05a57734.js"></script><script defer="defer" src="https://6304b336932f81000908fc39--melodious-granita-c9c445.netlify.app/526-2ab1d3475c35ab8befd6.js"></script><script defer="defer" src="https://6304b336932f81000908fc39--melodious-granita-c9c445.netlify.app/896-34ad65b8615baff8603d.js"></script><script defer="defer" src="https://6304b336932f81000908fc39--melodious-granita-c9c445.netlify.app/lib-3f0127fb962df241e57c.js"></script><link rel="stylesheet" href="https://6304b336932f81000908fc39--melodious-granita-c9c445.netlify.app/896.css">


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
        "SPECIES_REF": [{"id": 102, "coefficient": -1},
 {"id": 1, "coefficient": 1},
 {"id": 103, "coefficient": 1}
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
                 "name": "1.0 M HCl",
                 "description": "1.0 M Hydrochloric acid",
                 "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 1, "amount": 0.1},
                 {"id": 9, "amount": 0.1}
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
               {"name": "0.1% Methyl orange",
               "description": "0.1% Methyl orange",
                "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 101, "amount": 0.1/327.33},
                 {"id": 7, "amount": 0.1/327.33}
                 ]
               },
              {"name": "0.1% Bromocresol green",
               "description": "0.1% Bromocresol green",
                "volume": 0.1,
                 "species": [
                 {"id": 0},
                 {"id": 102, "amount": 0.1/698.01},
                 {"id": 7, "amount": 0.1/698.01}
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
                "name": "Methyl orange acid",
                "simpleName": "H-MeOrange",
                "state": "aq",
                "enthalpy": 0,
                "entropy": 0,
                "density": 3,
                "specificHeat": 0,
                "molecularWeight": 305.35,
                "hue": 0.0,
                "saturation": 81.0,
                "value": 91.0,
                "colorConcentration": 0.00002
            },
            {
                "id": 101,
                "name": "Methyl Orange (base)",
                "simpleName": "MeOrange<sup>-</sup>",
                "state": "aq",
                "enthalpy": 17.1,
                "entropy": -8.8,
                "density": 3,
                "specificHeat": 0,
                "molecularWeight": 317.4,
                "hue": 60.0,
                "saturation": 70.0,
                "value": 86.0,
                "colorConcentration": 0.00004
            },
            {
                "id": 102,
                "name": "Bromocresol green (acid)",
                "simpleName": "BrCresol Green<sup>-</sup>",
                "state": "aq",
                "enthalpy": 0,
                "entropy": 0,
                "charge": -1,
                "density": 3,
                "specificHeat": 0,
                "molecularWeight": 698.01,
                "hue": 60.0,
                "saturation": 70.0,
                "value": 86.0,
                "colorConcentration": 1e-6
            },
            {
                "id": 103,
                "name": "Bromocresol green (base)",
                "simpleName": "BrCresol Green <sup>2-</sup>",
                "state": "aq",
                "enthalpy": 24.4,
                "entropy": -10,
                "density": 3,
                "charge": -2,
                "specificHeat": 0,
                "molecularWeight": 697.01,
                "hue": 247.0,
                "saturation": 87.0,
                "value": 86.0,
                "colorConcentration": 1e-6

            },
        ]
    }
},
            spectra: {
   "SPECTRA_LIST": {
      "SPECIES": [
         {
            "id": "101", 
            "BAND": [{
               "wavelength": 460, 
               "width": 120, 
               "e": 2.9e4
            },
            {
               "wavelength": 400, 
               "width": 60, 
               "e": 0.8e4
            },
            {
               "wavelength": 290, 
               "width": 75, 
               "e": 1.24
            }
            ]
         }, 
         {
            "id": "100", 
            "BAND": [{
               "wavelength": 522, 
               "width": 60, 
               "e": 5.5e4,
            },
            {
               "wavelength": 327, 
               "width": 25, 
               "e": 0.8e4,
            }
            ]
         },
         {
            "id": "102", 
            "BAND": [{
               "wavelength": 442, 
               "width": 110, 
               "e": 5e6,
            },
          {
            "id": "103", 
            "BAND": [{
               "wavelength": 616, 
               "width": 70, 
               "e": 1.4e7,
            }
            ]
         },
      ]
   }
}
        };

  const language = 'en';
  const allowLoadAssignment = false;
  const showFirstTimeTips = false;
  let appModel;
  let appView;

  window.addEventListener('load', function () {
    appModel = new VLab.AppModel();
    appView = new VLab.AppView({ model: appModel,
    el: document.getElementById("vlab"),
    vlab: data,
    domain: "https://chemcollective.org/chem/jsvlab/"});
  }
  )
  </script>
