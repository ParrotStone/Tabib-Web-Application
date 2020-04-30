import http from "./HttpService";
import config from "../config.json";

// RemoteURL: https://5139cc91.ngrok.io/ =>> AZ web server
// LocalHost: http://localhost:8000/

export const login = (user) => {
  return http.post(config.apiLoginURL, user);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  getCurrentUser,
};
