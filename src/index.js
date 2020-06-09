import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
// import logger from "./services/logService";
import "./custom.scss";
import "./main.scss";

// Un-comment upon deploying
// logger.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
