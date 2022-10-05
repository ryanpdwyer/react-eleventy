---
title: Acetaminophen Data
layout: vanillabootflex-full.njk
---

## Acetaminophen class data

Class data for all 37 °C data (showing the mean).

<style>
.container-iframe {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>

<div class="container-iframe"> 
  <iframe class="responsive-iframe" src="/Acetaminophen-plain" frameBorder="0"></iframe>
</div>


## Acetaminophen class data - with error bars

Note that there is still a significant amount of uncertainty even averaging together the 4 data points at or near  37 °C.

<div class="container-iframe"> 
  <iframe class="responsive-iframe" src="/Acetaminophen-error" frameBorder="0"></iframe>
</div>
