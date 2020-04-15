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

export default {
  getDateFormat,
  notify,
};
