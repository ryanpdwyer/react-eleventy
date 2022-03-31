import { h, Component, render } from 'https://cdn.skypack.dev/preact';
import { Obfuscate } from "./obfuscate-preact.js";

/** @jsx h */
const div = document.getElementById("app");
render(
(<div className="content">
<h1>Obfuscate Preact Example</h1>
<Obfuscate email="dwyerry@mountunion.edu"/>
</div>
), div);