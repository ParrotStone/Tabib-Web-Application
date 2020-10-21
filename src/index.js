import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import logger from "./services/logService";
import "./pace.scss";
import "./custom.scss";
import "./main.scss";

// Un-comment upon deploying
// logger.init();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
