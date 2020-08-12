import { React } from 'https://unpkg.com/es-react@16.13.1';
import htm from 'https://unpkg.com/htm?module';

// Initialize htm with Preact
const html = htm.bind(React.createElement);

export function Question(props) {
    return html`<p>{props.children}</p>`
}