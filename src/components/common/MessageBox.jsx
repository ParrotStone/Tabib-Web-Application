import React, { Fragment } from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const MessageBox = (props) => {
  const { message, showDiseaseInfo } = props;
  const isMsgEmpty = message.length === 1 && !message[0].length;
  let styles = {
    padding: `${isMsgEmpty ? "0px" : "10px"}`,
    // top: "15px",
  };

  const isResultReady =
    Array.isArray(message[0]) || message[0].includes("couldn't find");
  const [resultMsg, otherMsgs] = message;
  const [predictionName, treatment, otherPredictions] = resultMsg;

  const determineRadiusCorner = (msgIndex) => {
    return msgIndex % 2 === 0
      ? { ...styles, borderTopLeftRadius: 0 }
      : { ...styles, borderBottomLeftRadius: 0 };
  };

  return (
    <Fragment>
      {isResultReady ? (
        <Fragment>
          <div className="message-box mt-3" style={determineRadiusCorner(0)}>
            {Array.isArray(resultMsg) ? (
              <Fragment>
                <span className="d-block border-bottom py-2">
                  <span className="font-weight-bold">Prediction: </span>
                  {predictionName}
                </span>
                <span className="d-block border-bottom py-2">
                  <span className="font-weight-bold">Treatment: </span>
                  {treatment}
                </span>
                {otherPredictions && (
                  <span className="d-block border-bottom py-2">
                    <span className="font-weight-bold">
                      Other possible predictions:{" "}
                    </span>
                    {otherPredictions.map((prediction, index) => (
                      <span key={index} className="d-block">
                        - {prediction}
                      </span>
                    ))}
                  </span>
                )}
                <span
                  className="d-block w-50 ml-auto py-2 mt-2 text-right"
                  onClick={() => showDiseaseInfo(true, resultMsg[0])}
                >
                  More info <KeyboardArrowRight />
                </span>
              </Fragment>
            ) : (
              resultMsg[0]
            )}
          </div>
          {otherMsgs.map((msg, index) => (
            <div
              key={index}
              className="message-box mt-2"
              style={{ padding: "10px" }}
            >
              {msg}
            </div>
          ))}
        </Fragment>
      ) : (
        message.map((msg, index) => (
          <div
            key={index}
            className="message-box mt-2"
            style={determineRadiusCorner(index)}
          >
            {msg}
          </div>
        ))
      )}
    </Fragment>
  );

  // return (
  //   <div className="message-box" style={styles}>
  //     {message.length >= 2 ? (
  //       <>
  //         <span className="d-block border-bottom py-2">
  //           <span className="font-weight-bold">Prediction: </span>
  //           {message[0]}
  //         </span>
  //         <span className="d-block border-bottom py-2">
  //           <span className="font-weight-bold">Treatment: </span>
  //           {message[1]}
  //         </span>
  //         {message[2] && (
  //           <span className="d-block border-bottom py-2">
  //             <span className="font-weight-bold">
  //               Other possible predictions:{" "}
  //             </span>
  //             {message[2].map((prediction, index) => (
  //               <span key={index} className="d-block">
  //                 - {prediction}
  //               </span>
  //             ))}
  //           </span>
  //         )}
  //         <span
  //           className="d-block w-50 ml-auto py-2 mt-2 text-right"
  //           onClick={() => showDiseaseInfo(true, message[0])}
  //         >
  //           More info <KeyboardArrowRight />
  //         </span>
  //       </>
  //     ) : (
  //       message
  //     )}
  //   </div>
  // );
};

export default MessageBox;
