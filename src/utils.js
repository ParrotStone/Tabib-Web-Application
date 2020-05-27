import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const getDateFormat = (timedate) => {
  // return timedate.toISOString().split("T")[0];
  const parts = timedate.toLocaleDateString().split("/");
  const newDateStr = `${parts[2]}-${parts[0]}-${parts[1]}`;
  return newDateStr;
};

export const notify = (notificationType, msg) => {
  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000,
    closeOnClick: false,
    hideProgressBar: true,
    pauseOnHover: false,
  };

  toast[notificationType](msg, options);
};

// Extract errors from response obj(given it's an expected error)
// In case of multiple errors, it's configured to report either (profile/other-data) errors -- and so, it doesn't show all the errors at once, for UX convenience...Nothing more or less.
const extractErrors = (errors) => {
  let errorsMsg = "";

  if (errors["profile"]) {
    const { profile } = errors;
    for (const key in profile) {
      errorsMsg += `${profile[key][0]}\n`;
    }

    return errorsMsg;
  }

  for (const key in errors) {
    errorsMsg += `${errors[key][0]}\n`;
  }

  return errorsMsg;
};

export const persistUserDetails = (accessToken, refreshToken, user) => {
  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("refresh-token", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("alarms", JSON.stringify([]));
};

export const reportUserErrors = (exception) => {
  if (exception.response && exception.response.status === 400) {
    const errors = exception.response.data;
    const errorsMsg = extractErrors(errors);
    notify("error", errorsMsg);
  }
};

export const capitalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const sortStrArr = (strArr) => {
  return strArr.sort((a, b) => {
    const aUpper = a.toUpperCase();
    const bUpper = b.toUpperCase();

    if (aUpper > bUpper) return 1;
    if (aUpper < bUpper) return -1;
    return 0;
  });
};

export const getPredictionMsg = (data) => {
  const { mainPredict } = data;
  const msg = mainPredict["name"]
    ? [
        mainPredict["name"],
        mainPredict["treatment"],
        mainPredict["otherPredicts"],
      ]
    : `Sorry, we couldn't find a disease based on your input`;

  return msg;
};

export const getCurrTimeInTwelveFormat = (currentTimeDate) => {
  if (typeof currentTimeDate === "string")
    currentTimeDate = new Date(currentTimeDate);

  let hours = currentTimeDate.getHours();
  const AMorPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 === 0 ? 12 : hours % 12;
  const minutes = currentTimeDate.toTimeString().split(":")[1];

  return `${hours}:${minutes} ${AMorPM}`;

  // OR
  // return currentTimeDate.toLocaleTimeString("en-US", {
  //   hour12: true,
  //   hour: "numeric",
  //   minute: "2-digit",
  // });
};

export default {
  getDateFormat,
  notify,
  reportUserErrors,
  persistUserDetails,
  capitalizeFirstLetter,
  sortStrArr,
  getPredictionMsg,
  getCurrTimeInTwelveFormat,
};
