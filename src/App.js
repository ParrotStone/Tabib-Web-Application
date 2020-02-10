import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import HomePg from "./components/home/index";
import AboutContent from "./components/about/about";

function App() {
  return (
    <React.Fragment>
      <Route path="/" exact component={HomePg} />
      <Route path="/home" exact component={HomePg} />
      <Route path="/about" exact component={AboutContent} />
    </React.Fragment>
  );
}

export default App;
