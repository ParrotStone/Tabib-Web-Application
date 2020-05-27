import React from "react";
import axios from "axios";

class Logout extends React.Component {
  componentDidMount() {
    // Clearing the user data and access/refresh tokens -- Logging the user out.
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    // Redirect to the homepage
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
