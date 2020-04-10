import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import HomePg from "./components/home/index";
import AboutContent from "./components/about/about";
import NotFound from "./components/common/notfound";
import Signup from "./components/signup/index";
import Account from "./components/profile/account";
import Signin from "./components/signin/index";
import ResetPassword from "./components/common/resetPassword";
import HomeDiagnosis from "./components/homeDiagnosis";
import Heatmap from "./components/heatmap/index";

function App() {
  // Mount ToastContainer if none is mounted
  toast.configure({
    style: { fontSize: "1.1rem" },
  });

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={HomePg} />
        <Redirect from="/home" to="/" />
        <Route path="/about" exact component={AboutContent} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Signin} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/homie" exact component={HomeDiagnosis} />
        <Route path="/account" exact component={Account} />
        <Route path="/heatmap" exact component={Heatmap} />
        <Route path="/not-found" exact component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
