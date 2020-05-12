import React, { useState } from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const styles = {
  cursor: "pointer",
};

const TimeAlarmItem = ({ alarmIdx, chosenTime, timeList, setTimeList }) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(chosenTime);

  const updateTime = (newTime) => {
    setTime(newTime);
    const clone = [...timeList];
    const idx = timeList.indexOf(time);
    clone[idx] = newTime;
    setTimeList(clone);
  };

  const deleteAlarmItem = (alarmIdx) => {
    const updatedList = timeList.filter((_, index) => index !== alarmIdx);
    setTimeList(updatedList);
  };

  return (
    <>
      <div className="w-75 mx-auto d-flex justify-content-between text-primary mb-3">
        <span>Alarm {alarmIdx + 1}:</span>
        <span style={styles} onClick={() => setOpen(true)}>
          {getCurrTimeInTwelveFormat(time)}
        </span>
        <span style={styles} onClick={() => deleteAlarmItem(alarmIdx)}>
          <DeleteIcon color="secondary" />
        </span>
      </div>
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
    </>
  );
};

export default TimeAlarmItem;
