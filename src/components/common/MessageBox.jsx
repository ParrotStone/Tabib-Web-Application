import React, { Fragment } from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const MessageBox = (props) => {
  const { message, isResultReady, showDiseaseInfo } = props;
  const isMsgEmpty = message.length === 1 && !message[0].length;
  let styles = {
    padding: `${isMsgEmpty ? "0px" : "10px"}`,
  };

  const [resultMsg, otherMsgs] = message;
  const [predictionName, treatment] = resultMsg;
  const otherPredicts = resultMsg[resultMsg.length - 1];

  const isSuccessfulSkin = predictionName && predictionName.includes("skin");
  const isFailedSkin = predictionName && predictionName.includes("determine");
  const isSkinResult = isSuccessfulSkin || isFailedSkin;

  const determineRadiusCorner = (msgIndex) => {
    return msgIndex % 2 === 0
      ? { ...styles, borderTopLeftRadius: 0 }
      : { ...styles, borderBottomLeftRadius: 0 };
  };

  return (
    <Fragment>
      {isResultReady ? (
        <Fragment>
          <div className="message-box mt-3" style={determineRadiusCorner(1)}>
            {Array.isArray(resultMsg) ? (
              <Fragment>
                <span className="d-block border-bottom py-2">
                  <span className="font-weight-bold">{`${
                    isSuccessfulSkin || !isSkinResult
                      ? `Prediction: ${predictionName}`
                      : predictionName
                  }`}</span>
                </span>
                {!isSkinResult && (
                  <span className="d-block border-bottom py-2">
                    <span className="font-weight-bold">Treatment: </span>
                    {treatment}
                  </span>
                )}
                {otherPredicts && otherPredicts.length > 0 && (
                  <span
                    className={`d-block py-2 ${
                      !isSkinResult ? "border-bottom" : ""
                    }`}
                  >
                    <span className="font-weight-bold">
                      Other possible predictions:{" "}
                    </span>
                    {otherPredicts.map((prediction, index) => (
                      <span key={index} className="d-block">
                        - {prediction}
                      </span>
                    ))}
                  </span>
                )}
                {!isSkinResult && (
                  <span
                    className="d-block w-50 ml-auto py-2 mt-2 text-right font-weight-bold more-info-span"
                    onClick={() => showDiseaseInfo(true, resultMsg[0])}
                  >
                    More info <KeyboardArrowRight />
                  </span>
                )}
              </Fragment>
            ) : (
              resultMsg
            )}
          </div>
          {otherMsgs.map((msg, index) => (
            <div
              key={index}
              className="message-box mt-2"
              style={determineRadiusCorner(2)}
            >
              {msg}
            </div>
          ))}
        </Fragment>
      ) : (
        message.map((msg, index) => (
          <div
            key={index}
            className="message-box mt-3"
            style={determineRadiusCorner(index)}
          >
            {msg}
          </div>
        ))
      )}
    </Fragment>
  );
};

export default MessageBox;
