import React from "react";
import Switch from "@material-ui/core/Switch";

const Alarm = ({ name, day, time, note }) => {
  const [switchState, setSwitchState] = React.useState({ checked: true });

  return (
    <div className="row">
      <div className="col-5">
        <h5 className="text-primary">{name}</h5>
        <p className="text-primary">
          {day} {time}
        </p>
      </div>
      <div className="col-7 text-right">
        <Switch
          checked={switchState.checked}
          onChange={() => setSwitchState({ checked: !switchState.checked })}
          name="active"
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <hr />
      <div className="col-12">{note || "No notes"}</div>
    </div>
  );
};

export default Alarm;
