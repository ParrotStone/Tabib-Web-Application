import React from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

const Alarm = ({ name, day, time, note, handleEdit, handleDelete }) => {
  const [switchState, setSwitchState] = React.useState({ checked: true });

  return (
    <div className="row">
      <div className="col-6">
        <h5 className="text-primary">{name}</h5>
        <p className="text-primary">{time}</p>
        <p>{day}</p>
      </div>
      <div className="col-6 text-right">
        <Switch
          checked={switchState.checked}
          onChange={() => setSwitchState({ checked: !switchState.checked })}
          name="active"
          color="primary"
          inputProps={{ "aria-label": "active checkbox" }}
        />
      </div>
      <div className="col-8">{note || "No notes"}</div>
      <div className="col-4 text-right">
        <Button
          variant="contained"
          className="bg-success text-white mr-3"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Alarm;
