import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    // Clearing the user data and access/refresh tokens -- Logging the user out.
    localStorage.clear();
    // Redirect to the homepage
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
