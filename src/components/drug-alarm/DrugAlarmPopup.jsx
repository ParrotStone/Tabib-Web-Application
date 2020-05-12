import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alarms from "./Alarms";
import AddDrugAlarm from "./AddDrugAlarm";

const DrugAlarmPopUp = (props) => {
  const [firstSelected, setFirstSelected] = useState(true);
  const [time, setTime] = useState(new Date());
  const [timeList, setTimeList] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [switchState, setSwitchState] = useState({ checked: false });
  const [selectedDays, setSelectedDays] = useState([]);
  const [note, setNote] = useState("");
  const [editStatus, setEditStatus] = useState({ wasEdited: false, id: null });
  const [timeBoxOpened, setTimeBoxOpened] = useState(false);
  const values = {
    firstSelected,
    setFirstSelected,
    time,
    setTime,
    timeList,
    setTimeList,
    drugName,
    setDrugName,
    switchState,
    setSwitchState,
    selectedDays,
    setSelectedDays,
    note,
    setNote,
    editStatus,
    setEditStatus,
    timeBoxOpened,
    setTimeBoxOpened,
  };
  const {
    show,
    handleClose,
    showAlarms,
    handleHideAlarms,
    handleShowPopup,
  } = props;

  const handleAddAlarm = () => {
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
              <Alarms handleHideAlarms={handleHideAlarms} values={values} />
            </div>
          )}
          {!showAlarms && (
            <div className="container">
              <AddDrugAlarm handleShowPopup={handleShowPopup} values={values} />
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
