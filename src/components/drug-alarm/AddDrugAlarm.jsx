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

const spaceIconText = {
  width: "35px",
};

const AddDrugAlarm = ({ handleShowPopup, values }) => {
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const {
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
  } = values;

  // // Another way to set the current time in case no time was chosen, figure out how Hooks & useEffect(when it's called) works more :) -- {05/17/2020}
  // React.useEffect(() => {
  //   if (!timeBoxOpened) setTime(currentTime);
  // });

  const resetUIToDefault = () => {
    // Resetting the UI back to default values
    setFirstSelected(true);
    setTime(new Date());
    setTimeList([]);
    setDrugName("");
    setSwitchState({ checked: false });
    setSelectedDays([]);
    setNote("");
    setEditStatus({ edit: false, id: null });
    setTimeBoxOpened(false);
  };

  const handleAddAlarm = (ev) => {
    ev.preventDefault();

    // In the case where no alarm is set(in the many(alarms) option)
    if (!firstSelected && !timeList.length) {
      notify(
        "info",
        <p className="d-flex">
          <span className="material-icons mt-1" style={spaceIconText}>
            error_icon
          </span>{" "}
          <span>You have to add an alarm!</span>
        </p>
      );

      return;
    }

    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (editStatus.edit) {
      const targetIdx = alarms.findIndex((alarm) => alarm.id === editStatus.id);
      const updated = { ...alarms[targetIdx] };
      updated.time = firstSelected ? time : timeList;
      updated.timeList = firstSelected ? [] : timeList;
      updated.drugName = drugName;
      updated.selectedDays = selectedDays;
      updated.note = note;
      alarms[targetIdx] = updated;

      localStorage.setItem("alarms", JSON.stringify(alarms));
    }

    if (!editStatus.edit) {
      // This way is better, I kinda not fully convinced, the other way is using lifecycle methods(hooks) or useEffect thingie
      // I guess the ordinary way(if condition at the beginning method to check if the damn thing is opened or not) didn't work coz of the asynchronous nature of state updating -> figure out how it works and come back to this piece of code to see if anything can be improved, also, asked around about online about how this code can be improved and ask about why the earlier code(if cond...) didn't work and get answers!! It's important to do!(reddit and twitter are good places to start with)
      const currTimeTomorrow = new Date(currentTime);
      currTimeTomorrow.setDate(currentTime.getDate() + 1);
      currTimeTomorrow.setSeconds(0, 0);

      let chosenTime = firstSelected
        ? !timeBoxOpened
          ? currTimeTomorrow
          : time
        : timeList;

      const lastItem = alarms[alarms.length - 1];
      const id = lastItem ? lastItem.id + 1 : 1;
      const alarmItem = {
        id,
        time: chosenTime,
        drugName,
        selectedDays,
        note,
        isActive: true,
      };

      alarms.push(alarmItem);
      localStorage.setItem("alarms", JSON.stringify(alarms));
    }

    handleShowPopup(ev);
    resetUIToDefault();

    notify(
      "success",
      <p className="d-flex align-items-center">
        <span className="material-icons mr-2">check_circle_outline</span>{" "}
        <span>Alarm Saved Successfully!</span>
      </p>
    );
  };

  const updateTime = (newTime) => {
    const isNextDay = newTime <= currentTime;
    if (isNextDay) newTime.setDate(newTime.getDate() + 1);
    else newTime.setDate(currentTime.getDate());

    newTime.setSeconds(0, 0);

    if (firstSelected) {
      // The reason I have put the setTimeBoxOpened here in the one alarm only section is coz if it were put top-leve of the function it would cause the the opened to be for all which when choose just the current date/time of the many alarm option, would find the first alarm thingie to be the right where the following times-pickers are out of sync with the current time -- in essence, it was put here inside of the condition on a damn valid good reason, see the Git(Hub) log for more details
      setTimeBoxOpened(true);
      setTime(newTime);
      // Kinda unncessary, figure out later how to remove it(safely)
      setCurrentTime(newTime);
      return;
    }

    setTimeList([...timeList, newTime]);
  };

  const handleCancelClick = (ev) => {
    handleShowPopup(ev);
    resetUIToDefault();
  };

  return (
    <>
      {firstSelected && (
        <TimeBoxIndicator
          setOpen={setOpen}
          time={time}
          currentTime={currentTime}
          opened={timeBoxOpened}
        />
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
      <div className="d-none">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            open={open}
            onClose={() => setOpen(false)}
            value={timeBoxOpened ? time : currentTime}
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
              validators={[
                "required",
                "isString",
                "minStringLength:3",
                "matchRegexp:[A-z0-9]{3,}$",
              ]}
              errorMessages={[
                "This field is required",
                "Drug name must be a valid text",
                "Drug name must be a minimum of 3 characters",
                "Drug name must contain valid characters",
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
              onClick={handleCancelClick}
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
