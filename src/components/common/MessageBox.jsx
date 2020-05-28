import React from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const MessageBox = (props) => {
  const { message, left, bottom, secondMsg, result, showDiseaseInfo } = props;
  let styles = { padding: `${!message.length ? "0px" : "10px"}`, top: "25px" };
  if (left) styles = { ...styles, borderTopLeftRadius: 0 };
  if (bottom) styles = { ...styles, borderBottomLeftRadius: 0 };
  if (secondMsg) {
    let distanceValue = 75;
    if (Array.isArray(result)) distanceValue = 55 * result.length + 25;
    styles = {
      ...styles,
      padding: "10px 20px",
      top: `${distanceValue}px`,
    };
  }

  return (
    <div className="message-box" style={styles}>
      {Array.isArray(message) ? (
        <>
          <span className="d-block border-bottom py-2">
            <span className="font-weight-bold">Prediction: </span>
            {message[0]}
          </span>
          <span className="d-block border-bottom py-2">
            <span className="font-weight-bold">Treatment: </span>
            {message[1]}
          </span>
          {message[2] && (
            <span className="d-block border-bottom py-2">
              <span className="font-weight-bold">
                Other possible predictions:{" "}
              </span>
              {message[2]}
            </span>
          )}
          <span
            className="d-block w-50 ml-auto py-2 mt-2 text-right"
            onClick={() => showDiseaseInfo(true, message[0])}
          >
            More info <KeyboardArrowRight />
          </span>
        </>
      ) : (
        message
      )}
    </div>
  );
};

export default MessageBox;
