import Push from "push.js";

/*
 time: "2020-05-19T23:30:42.131Z"
 drugName: "this is an alarm"
 selectedDays: []
 note: "this is my first alarm ;)"
 isActive: true
 timeList: []
*/

// Problems with current approach:
// - When it's initialized(a place where all the app is mounted and can notify the user wherever they are on the site)
// - Work in the background and notify the user even if the page is closed or the whole browser is closed(service workers)
// - Work with multiple times(after & before(next day))
// - Work with one(singular) and multiple(alarms as above) but with repeat option set on the alarm itself
// - Same thing with many alarms thingie
// - Mass test it

export const initAlarmNotification = () => {
  // Remove the old set timers in case of the update/delete only
  // in the other cases, you just update the state(to notice the damn changes(in case of update->adding new alarm))

  const alarms = JSON.parse(localStorage.getItem("alarms"));

  alarms.forEach((alarm) => {
    // If one time alarm only, do the following
    if (!Array.isArray(alarm.time)) {
      if (alarm.isActive) {
        console.log('This is a one time-alarm only!');
        checkSingleAlarm(alarm);
        alarm.isActive = false;
        const alarmIdx = alarms.findIndex(modifiedAlarm => modifiedAlarm.id === alarm.id);
        alarms[alarmIdx] = alarm;
        localStorage.setItem('alarms', JSON.stringify(alarms));
      }
    } else {
      if (alarm.isActive) {
        checkMultipleAlarms(alarm);
      }
    }
  });
};

const checkSingleAlarm = (alarm) => {
  console.log('Checking single alarm');

  const delay = new Date(alarm.time) - new Date();
  checkTimeAndNotify(alarm, delay);
};

const checkMultipleAlarms = (alarm) => {
  alarm.time.forEach((singleTime) => {
    const delay = new Date(singleTime) - new Date();
    checkTimeAndNotify(alarm, delay);
  });
};

const checkTimeAndNotify = ({ drugName, note }, delay) => {
  if (delay > 0) {
    setTimeout(() => {
      notifyDrugAlarm(drugName, note);
    }, delay);
  }
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
