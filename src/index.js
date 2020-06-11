import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
