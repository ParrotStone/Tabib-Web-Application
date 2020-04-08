import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App";
// import logger from "./services/logService";
import "./custom.scss";
import "./main.css";
import * as serviceWorker from "./serviceWorker";

// Un-comment upon deploying
// logger.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
