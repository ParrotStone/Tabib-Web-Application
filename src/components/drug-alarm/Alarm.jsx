import React from "react";
import Switch from "@material-ui/core/Switch";

const Alarm = ({ day, time, note }) => {
  const [switchState, setSwitchState] = React.useState({ checked: true });

  return (
    <div className="row">
      {day}
      {time}
      <div className="col-9 text-right">
        <Switch
          checked={switchState.checked}
          onChange={() => setSwitchState({ checked: !switchState.checked })}
          name="active"
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <div className="col">{note}</div>
    </div>
  );
};

export default Alarm;
