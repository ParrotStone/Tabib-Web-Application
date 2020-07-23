import React, { useState } from "react";
import Alarm from "./Alarm";
import { initAlarmNotification } from "./DrugAlarmUtils.js";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getCurrentAlarmItem = (target) => {
  // To get the exact elemented clicked whether the clicked target was the span|button itself -- needs reviewing to see if there is a better way
  let targetAlarm = target;
  while (!targetAlarm.classList.contains("list-group-item")) {
    targetAlarm = targetAlarm.parentElement;
  }

  return targetAlarm;
};

const Alarms = ({ handleHideAlarms, values }) => {
  // Initialize the alarms(after being upated(added))
  initAlarmNotification();
  // Fetches the list from the local storage, and then represent using a single Alarm component
  const [alarmsList, setAlarmsList] = useState(
    JSON.parse(localStorage.getItem("alarms"))
  );

  const updateStatus = (id) => {
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    const alarmIdx = alarms.findIndex((alarm) => alarm.id === id);
    alarms[alarmIdx].isActive = !alarms[alarmIdx].isActive;
    setAlarmsList(alarms);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  };

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
    // The case where {One} time alarms is selected
    if (!Array.isArray(targetAlarmData["time"])) {
      setFirstSelected(true);
      setTime(targetAlarmData["time"]);
      setDrugName(targetAlarmData["drugName"]);
      setSwitchState({
        checked: targetAlarmData["selectedDays"].length ? true : false,
      });
      setDrugName(targetAlarmData["drugName"]);
      setSelectedDays(targetAlarmData["selectedDays"]);
      setNote(targetAlarmData["note"]);
      return;
    }

    // The case where {Many} time alarms is selected
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
  };

  const handleEdit = ({ target }) => {
    const targetAlarm = getCurrentAlarmItem(target);
    const targetAlarmData = alarmsList.find((_, index) =>
      targetAlarm.id.includes(index)
    );

    setEditStatus({ edit: true, id: targetAlarmData.id });
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

  const handleDaysShow = (selectedDays, time) => {
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

    let days = [];
    if (Array.isArray(time)) {
      for (let singleTime of time) {
        days.push(new Date(singleTime).toDateString().slice(0, 3));
      }
    } else {
      days.push(new Date(time).toDateString().slice(0, 3));
    }

    days = [...new Set(days)];

    return (
      <span className="text-primary font-weight-bold">
        <span>Alarm set at: </span>
        {days.map((day, index) => (
          <span key={index} className="mr-1">
            {day}
          </span>
        ))}
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
          alarmsList.map(
            ({ id, drugName, isActive, selectedDays, time, note }, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  isActive ? "" : "disabled-alarm"
                }`}
                id={`alarm-${index}`}
              >
                <Alarm
                  id={id}
                  name={drugName}
                  isActive={isActive}
                  updateStatus={updateStatus}
                  day={handleDaysShow(selectedDays, time)}
                  time={handleTimeShow(time)}
                  note={note}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </li>
            )
          )
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
