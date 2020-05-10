import React from "react";

const weekdays = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
const commonStyles = {
  cursor: "pointer",
  display: "inline-block",
  marginRight: "20px",
};

const WeekDays = ({ selectedDays, setSelectedDays }) => {
  const handleDayClick = ({ target }) => {
    const currentDay = target.textContent;
    if (selectedDays.includes(currentDay)) {
      setSelectedDays(selectedDays.filter((day) => day !== currentDay));
      return;
    }

    setSelectedDays([...selectedDays, currentDay]);
  };

  return (
    <>
      {weekdays.map((day, index) => (
        <span
          key={index}
          style={commonStyles}
          className={
            selectedDays.includes(day)
              ? "text-primary font-weight-bold"
              : "text-secondary"
          }
          onClick={handleDayClick}
        >
          {day}
        </span>
      ))}
    </>
  );
};

export default WeekDays;
