import http from "./httpService";
import config from "../config.json";

// RemoteURL: https://5139cc91.ngrok.io/ =>> AZ web server
// LocalHost: http://localhost:8000/

export const login = (user) => {
  return http.post(config.apiLoginURL, user);
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export default {
  login,
  getCurrentUser,
};
