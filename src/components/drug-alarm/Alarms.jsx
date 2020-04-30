import React from "react";
import Alarm from "./alarm";

const Alarms = (props) => {
  // Fetches the list from the local storage, and then represent using a single Alarm component
  const staticAlarmsList = [
    {
      day: "Fri",
      time: "15:30",
      note: "This is some note related to the Friday drug alarm",
    },
    {
      day: "Mon",
      time: "14:30",
      note: "This is some note related to the Monday drug alarm",
    },
    {
      day: "Wed",
      time: "19:30",
      note: "This is some note related to the Wednesday drug alarm",
    },
  ];

  const handleAlarmItemClk = () => {
    console.log("alarm item clicked!");
  };

  return (
    <React.Fragment>
      <ul className="list-group">
        {staticAlarmsList.map(({ day, time, note }, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={handleAlarmItemClk}
            style={{ cursor: "pointer" }}
          >
            <Alarm day={day} time={time} note={note} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Alarms;
