import http from "./HttpService";
import config from "../config.json";

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
