import React from "react";
import Alarm from "./Alarm";
import WeekDays from "./WeekDays";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const weekdays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
const Alarms = (props) => {
  /*
      {
      name: "Heart disease medicine alarm",
      day: "Fri",
      time: "15:30",
      note: "This is some note related to the Friday drug alarm",
      isActive: true,
    },
    {
      name: "Headache medicine alarm",
      day: "Wed",
      time: "19:30",
      note: null,
      isActive: true,
    },
    {
      name: "Some medicine alarm",
      day: "Sun",
      time: "22:30",
      note: "This is some note related to the Sunday drug alarm",
      isActive: true,
    },
  */

  // Fetches the list from the local storage, and then represent using a single Alarm component
  const [alarmsList, setAlarmsList] = React.useState(
    JSON.parse(localStorage.getItem("alarms"))
  );

  const handleEdit = ({ target }) => {
    // You need to update the state and the damn data store ;) HERE -- Once you configure the damn add first, then handle this case :)
    console.log(target);
  };

  const handleDelete = ({ target }) => {
    // To get the exact elemented clicked whether the clicked target was the span|button itself -- needs more review to see if there is a better way
    let targetAlarm = target;
    while (!targetAlarm.classList.contains("list-group-item")) {
      targetAlarm = targetAlarm.parentElement;
    }

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
          onClick={null}
        >
          {day}
        </span>
      ));
    }

    return (
      <span className="text-primary font-weight-bold">
        {new Date(time).toDateString().slice(0, 3)}
      </span>
    );
  };

  return (
    <React.Fragment>
      <ul className="list-group">
        {alarmsList.length ? (
          alarmsList.map(({ drugName, selectedDays, time, note }, index) => (
            <li key={index} className="list-group-item" id={`alarm-${index}`}>
              <Alarm
                name={drugName}
                day={handleDaysShow(selectedDays, time)}
                time={getCurrTimeInTwelveFormat(time)}
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
