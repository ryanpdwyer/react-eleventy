import { React, ReactDOM } from 'https://unpkg.com/es-react@16.13.1';


function App (props) {
  return <h1>Hello {props.name}!</h1>
}

const div = document.getElementById("preact-node");

ReactDOM.render(<App name="Ryan" />, div);