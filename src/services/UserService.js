import http from "./HttpService";
import config from "../config.json";

export const register = (user) => {
  return http.post(config.apiSignupURL, user);
};

export const getUserProfile = (accessToken, refreshToken) => {
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
