import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import HomePg from "./components/home/index";
import AboutContent from "./components/about/about";
import NotFound from "./components/common/notfound";
import Signup from "./components/signup/index";
import Profile from "./components/profile/profile";
import Signin from "./components/signin/index";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/common/logout";
import ResetPassword from "./components/common/resetPassword";
import CoronaMap from "./components/heatmap/index";

import PrivacyPolicy from "./components/common/privacyPolicy";
import Terms from "./components/common/terms";

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
          <Route path="/login" exact component={Signin} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <Route path="/coronamap" exact component={CoronaMap} />
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
