import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const getDateFormat = (timedate) => {
  return timedate.toISOString().split("T")[0];
};

const notify = (notificationType, msg) => {
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
