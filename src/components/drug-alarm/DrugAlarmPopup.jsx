import React from "react";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alarms from "./Alarms";
import AddDrugAlarm from "./AddDrugAlarm";

const DrugAlarmPopUp = (props) => {
  const {
    show,
    handleClose,
    showAlarms,
    handleHideAlarms,
    handleShowPopup,
  } = props;

  const handleAddAlarm = () => {
    /*
      - Hide the alarm list
      - Show the add page with some nice animation
      - Show a back button & save button that returns to the list and not close the damn drug alarm altogether
    */

    handleHideAlarms();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        onExited={handleHideAlarms}
        aria-labelledby="drug-alarm-modal"
        dialogClassName="drug-alarm-width-70"
        centered
      >
        <Modal.Header
          closeButton
          className="flex-column-reverse align-items-center"
        >
          {showAlarms && (
            <Modal.Title className="text-primary text-center">
              <h1>
                <AccessAlarmIcon
                  style={{ fontSize: "2.7rem" }}
                  className="mt-n2"
                />{" "}
                Drug Alarm
              </h1>
            </Modal.Title>
          )}
          {!showAlarms && (
            <Modal.Title className="text-primary text-center">
              <h1>
                <AddAlarmIcon
                  style={{ fontSize: "2.7rem" }}
                  className="mt-n2"
                />{" "}
                Add Alarm(s)
              </h1>
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {showAlarms && (
            <div className="alarms-container">
              <Alarms />
            </div>
          )}
          {!showAlarms && (
            <div className="container">
              <AddDrugAlarm handleShowPopup={handleShowPopup} />
            </div>
          )}
          {showAlarms && (
            <div className="row mt-3 px-2">
              <div className="col text-right">
                <button
                  className="btn btn-primary p-0 m-0 pill-border"
                  onClick={handleAddAlarm}
                >
                  <AddCircleIcon style={{ fontSize: "2.5rem" }} />
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DrugAlarmPopUp;
