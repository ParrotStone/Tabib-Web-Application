import React, { useState } from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NoteIcon from "@material-ui/icons/Note";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";

import TimeBoxIndicator from "./TimeBoxIndicator";
import { notify } from "../../utils.js";
import CustomButtonGroup from "../common/CustomButtonGroup";
import WeekDays from "./WeekDays";
import TimeAlarmItem from "./TimeAlarmItem";

const addAlarmStyles = {
  cursor: "pointer",
};

const AddDrugAlarm = ({ handleShowPopup }) => {
  const [firstSelected, setFirstSelected] = useState(true);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeList, setTimeList] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [switchState, setSwitchState] = useState({ checked: false });
  const [selectedDays, setSelectedDays] = useState([]);
  const [note, setNote] = useState("");

  const handleAddAlarm = (ev) => {
    ev.preventDefault();

    const alarms = JSON.parse(localStorage.getItem("alarms"));
    const alarmItem = {
      time: timeList.length ? timeList : time,
      drugName,
      selectedDays,
      note,
      isActive: true,
    };
    alarms.push(alarmItem);
    localStorage.setItem("alarms", JSON.stringify(alarms));

    handleShowPopup(ev);
    notify(
      "success",
      <p className="d-flex align-items-center">
        <span className="material-icons mr-2">check_circle_outline</span>{" "}
        <span>{drugName} Alarm Saved!</span>
      </p>
    );
  };

  const updateTime = (newTime) => {
    if (firstSelected) {
      setTime(newTime);
      return;
    }

    setTimeList([...timeList, newTime]);
  };

  return (
    <>
      {firstSelected && <TimeBoxIndicator setOpen={setOpen} time={time} />}
      {!firstSelected && (
        <div
          className="w-75 mx-auto d-flex justify-content-between text-primary"
          style={addAlarmStyles}
          onClick={() => setOpen(true)}
        >
          <span>Add Alarm</span>
          <AddIcon />
        </div>
      )}
      {!firstSelected &&
        timeList.map((time, idx) => (
          <TimeAlarmItem
            key={idx}
            alarmIdx={idx}
            chosenTime={time}
            timeList={timeList}
            setTimeList={setTimeList}
          />
        ))}
      <div className="d-none">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            open={open}
            onClose={() => setOpen(false)}
            value={time}
            onChange={updateTime}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="mt-4">
        <CustomButtonGroup
          fstBtnText="One"
          sndBtnText="Many"
          isFirstSelected={firstSelected}
          setFirstSelected={setFirstSelected}
        />
      </div>
      <div className="w-75 mx-auto">
        <ValidatorForm
          instantValidate
          onSubmit={handleAddAlarm}
          className="w-100"
          autoComplete="on"
        >
          <div className="mt-3">
            <TextValidator
              id="drug-name"
              label="Drug Name"
              name="drug-name"
              fullWidth
              validators={["required", "isString", "minStringLength:3"]}
              errorMessages={[
                "This field is required",
                "Drug name must be a valid text",
                "Drug name must be a minimum of 3 characters",
              ]}
              value={drugName}
              onChange={(ev) => setDrugName(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NoteIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            Repeat
            <Switch
              checked={switchState.checked}
              onChange={() =>
                setSwitchState({ checked: !switchState.checked }) ||
                setSelectedDays([])
              }
              name="repeat-switch"
              color="primary"
              inputProps={{ "aria-label": "repeat checkbox" }}
            />
          </div>
          {switchState.checked && (
            <div className="mt-2 d-flex justify-content-center">
              <WeekDays
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            </div>
          )}
          <div className="mt-4">
            <TextField
              id="note"
              label="Notes"
              multiline
              fullWidth
              rows={4}
              value={note}
              onChange={(ev) => setNote(ev.target.value)}
              variant="outlined"
            />
          </div>
          <div className="d-flex justify-content-between flex-row-reverse mt-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CheckCircleOutlineRoundedIcon />}
            >
              Save Alarm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={handleShowPopup}
            >
              Cancel
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </>
  );
};

export default AddDrugAlarm;
