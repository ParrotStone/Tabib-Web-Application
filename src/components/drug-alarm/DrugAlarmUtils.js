import Push from "push.js";

/*
 time: "2020-05-19T23:30:42.131Z"
 drugName: "this is an alarm"
 selectedDays: []
 note: "this is my first alarm ;)"
 isActive: true
 timeList: []
*/

export const initAlarmNotification = () => {
  const alarms = JSON.parse(localStorage.getItem("alarms"));
  alarms.forEach((alarm) => {
    const currAlarmTime = new Date(alarm.time).toTimeString();
    let wasNotified = false;

    const intervalID = setTimeout(() => {
      const currTimeObj = new Date();
      currTimeObj.setSeconds(0, 0);
      const currTime = currTimeObj.toTimeString();

      if (currTime > currAlarmTime || wasNotified) clearInter();

      if (alarm.isActive && currTime === currAlarmTime && !wasNotified) {
        notifyDrugAlarm(alarm.drugName, alarm.note);
        wasNotified = true;
      }
    }, 1500);

    const clearInter = () => clearInterval(intervalID);
  });
};

const notifyDrugAlarm = (drugName, note) => {
  Push.create(drugName, {
    body: note,
    timeout: 6000,
  });
};

export default {
  initAlarmNotification,
};
