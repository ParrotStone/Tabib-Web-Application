import http from "./httpService";
import config from "../config.json";

export const login = (user) => {
  return http.post(config.apiLoginURL, user);
};

export default {
  login,
};
