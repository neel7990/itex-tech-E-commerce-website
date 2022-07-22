import React from "react";
import ReactDOM from "react-dom";

import Routes from "./Routes";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
   
    {/* <Routes /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
