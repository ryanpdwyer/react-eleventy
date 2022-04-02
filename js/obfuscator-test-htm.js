import { h, Component, render } from 'https://cdn.skypack.dev/preact';
import htm from 'https://cdn.skypack.dev/htm';
import { Obfuscate } from "./obfuscator-preact-compiled.js";

const html = htm.bind(h);


const div = document.getElementById("app");
render(
html`<div className="contact">
<h1>Obfuscate Preact Example</h1>
You can contact us by <${Obfuscate}
    email="info@chemcollective.org"
    headers=${{
        body: "\n\n---\nURL: https://chemcollective.org/my-current-url\nVLab: assignmentPath",
    }}
    >email<//>.
</div>`,
div);