import http from "./httpService";
import config from "../config.json";

const register = (user) => {
  return http.post(config.apiSignupURL, user);
};

export default {
  register,
};
