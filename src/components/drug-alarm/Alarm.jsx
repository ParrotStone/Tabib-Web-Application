import React from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Alarm = ({ name, day, time, note, handleEdit, handleDelete }) => {
  const [switchState, setSwitchState] = React.useState({ checked: true });

  return (
    <div className="row">
      <div className="col-6">
        <h5 className="text-primary font-weight-bold">{name}</h5>
        <p className="text-primary">
          {time.length
            ? time.map((timeItem, index) => (
                <span key={index} className="mr-1">
                  {timeItem}
                </span>
              ))
            : time}
        </p>
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
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Alarm;
