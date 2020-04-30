import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import HomePg from "./components/home/index";
import AboutContent from "./components/about/About";
import NotFound from "./components/common/Notfound";
import Signup from "./components/signup/index";
import Profile from "./components/profile/Profile";
import Login from "./components/login/index";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Logout from "./components/common/Logout";
import ResetPassword from "./components/common/ResetPassword";
import Map from "./components/density-map/index";

import PrivacyPolicy from "./components/common/PrivacyPolicy";
import Terms from "./components/common/Terms";

const App = () => {
  // Mount ToastContainer if none is mounted
  toast.configure({
    style: { fontSize: "1.1rem" },
  });

  // Customize the colors of the form
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#12a2f9",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={HomePg} />
          <Redirect from="/home" to="/" />
          <Route path="/about" exact component={AboutContent} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <Route path="/coronamap" exact component={Map} />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route path="/terms-of-use" exact component={Terms} />
          <Route path="/not-found" exact component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;
