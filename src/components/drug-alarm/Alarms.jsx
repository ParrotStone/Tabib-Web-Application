import React, { useState } from "react";
import Alarm from "./Alarm";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const weekdays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

const getCurrentAlarmItem = (target) => {
  // To get the exact elemented clicked whether the clicked target was the span|button itself -- needs more review to see if there is a better way
  let targetAlarm = target;
  while (!targetAlarm.classList.contains("list-group-item")) {
    targetAlarm = targetAlarm.parentElement;
  }

  return targetAlarm;
};

const Alarms = ({ handleHideAlarms, values }) => {
  // Fetches the list from the local storage, and then represent using a single Alarm component
  const [alarmsList, setAlarmsList] = useState(
    JSON.parse(localStorage.getItem("alarms"))
  );

  const {
    setFirstSelected,
    setTime,
    setTimeList,
    setDrugName,
    setSwitchState,
    setSelectedDays,
    setNote,
    setEditStatus,
    setTimeBoxOpened,
  } = values;

  const fillFields = (targetAlarmData) => {
    setTimeBoxOpened(true);
    // The case where {Many} time alarms is selected
    if (Array.isArray(targetAlarmData["time"])) {
      setFirstSelected(false);
      setTimeList(targetAlarmData["time"]);
      setDrugName(targetAlarmData["drugName"]);
      setSwitchState({
        checked: targetAlarmData["selectedDays"].length ? true : false,
      });
      setDrugName(targetAlarmData["drugName"]);
      setSelectedDays(targetAlarmData["selectedDays"]);
      setNote(targetAlarmData["note"]);
      handleHideAlarms();
      return;
    }

    // The case where {One} time alarms is selected
    setFirstSelected(true);
    setTime(targetAlarmData["time"]);
    setDrugName(targetAlarmData["drugName"]);
    setSwitchState({
      checked: targetAlarmData["selectedDays"].length ? true : false,
    });
    setDrugName(targetAlarmData["drugName"]);
    setSelectedDays(targetAlarmData["selectedDays"]);
    setNote(targetAlarmData["note"]);
  };

  const handleEdit = ({ target }) => {
    const targetAlarm = getCurrentAlarmItem(target);
    const targetAlarmData = alarmsList.find((_, index) =>
      targetAlarm.id.includes(index)
    );

    setEditStatus({ edited: true, id: targetAlarmData.id });
    console.log(targetAlarmData);
    fillFields(targetAlarmData);
    handleHideAlarms();
  };

  const handleDelete = ({ target }) => {
    const targetAlarm = getCurrentAlarmItem(target);
    const filteredAlarmList = alarmsList.filter(
      (_, index) => !targetAlarm.id.includes(index)
    );
    localStorage.setItem("alarms", JSON.stringify(filteredAlarmList));
    setAlarmsList(filteredAlarmList);
  };

  const handleDaysShow = (selectedDays) => {
    if (selectedDays.length) {
      return weekdays.map((day, index) => (
        <span
          key={index}
          className={
            selectedDays.includes(day)
              ? "text-primary mr-3 font-weight-bold"
              : "text-secondary mr-3"
          }
        >
          {day}
        </span>
      ));
    }

    return (
      <span className="text-primary font-weight-bold">
        {new Date().toDateString().slice(0, 3)}
      </span>
    );
  };

  const handleTimeShow = (timeList) => {
    if (Array.isArray(timeList)) {
      return timeList
        .map((time) => `${getCurrTimeInTwelveFormat(time)}`)
        .join(", ");
    }

    return getCurrTimeInTwelveFormat(timeList);
  };

  return (
    <React.Fragment>
      <ul className="list-group">
        {alarmsList.length ? (
          alarmsList.map(({ drugName, selectedDays, time, note }, index) => (
            <li key={index} className="list-group-item" id={`alarm-${index}`}>
              <Alarm
                name={drugName}
                day={handleDaysShow(selectedDays)}
                time={handleTimeShow(time)}
                note={note}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </li>
          ))
        ) : (
          <h4 className="text-primary text-center">
            No drug alarms are set yet
          </h4>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Alarms;
