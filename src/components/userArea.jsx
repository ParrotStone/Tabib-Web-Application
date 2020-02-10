import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class UserArea extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container user-area-wrapper d-flex flex-column">
          <div className="emu-pic mt-4 align-self-center"></div>
          <div className="mt-5">
            <Link to="account" className="d-block  my-2">
              <PersonIcon className="text-light mx-3" />
              Account
            </Link>
            <Link to="not-found" className="d-block  my-2">
              <AccessAlarmsIcon className="text-light mx-3" />
              Drug Alarm
            </Link>
            <Link to="/logout" className="d-block  my-2">
              <ExitToAppIcon className="text-light mx-3" />
              Sign out
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserArea;
