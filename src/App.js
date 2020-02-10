import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePg from "./components/home/index";
import AboutContent from "./components/about/about";
import NotFound from "./components/common/notfound";
import Signup from "./components/signup/index";
import Account from "./components/profile/account";

import HomeDiagnosis from "./components/homeDiagnosis";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={HomePg} />
        <Redirect from="/home" to="/" />
        <Route path="/about" exact component={AboutContent} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/homie" exact component={HomeDiagnosis} />
        <Route path="/account" exact component={Account} />
        <Route path="/not-found" exact component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
