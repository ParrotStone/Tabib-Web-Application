import axios from "axios";
import utils from "../utils.js";
// import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // Logging the error to the client Console in development mode
    console.error(`${error}`);
    // // Uncomment in production -- configure Sentry options before deployment
    // logger.log(error);
    utils.notify("error", "Oops!! Something went wrong");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
