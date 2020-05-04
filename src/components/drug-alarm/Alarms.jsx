import React from "react";
import Alarm from "./Alarm";

const Alarms = (props) => {
  // Fetches the list from the local storage, and then represent using a single Alarm component
  const staticAlarmsList = [
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
  ];

  const handleAlarmItemClk = () => {
    console.log("alarm item clicked!");
  };

  return (
    <React.Fragment>
      <ul className="list-group">
        {staticAlarmsList.map((alarm, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={handleAlarmItemClk}
            style={{ cursor: "pointer" }}
          >
            <Alarm
              name={alarm.name}
              day={alarm.day}
              time={alarm.time}
              note={alarm.note}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Alarms;
