import http from "./httpService";
import config from "../config.json";

const register = (user) => {
  return http.post(config.apiSignupURL, user);
};

const getUserProfile = (accessToken, refreshToken) => {
  return http.get(config.apiUserProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default {
  register,
  getUserProfile,
};
