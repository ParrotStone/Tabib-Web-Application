import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import MapIcon from "@material-ui/icons/Map";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import defaultUsrImg from "../images/defaultUsrImg.png";

class UserArea extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <div className="container user-area-wrapper d-flex flex-column">
          <div className="mt-4 align-self-center">
            <img
              src={user.picture_url ? user.picture_url : defaultUsrImg}
              alt="User"
              style={{
                padding: "10px",
                width: "200px",
                background: "white",
                border: "1px solid white",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="mt-4">
            <Link to="/profile" className="d-block my-2 nav-header-link">
              <PersonIcon className="text-light mx-3" />
              Profile
            </Link>
            <Link to="/coronamap" className="d-block my-2 nav-header-link">
              <MapIcon className="text-light mx-3" />
              Corona Map
            </Link>
            <Link to="/drug-alarm" className="d-block my-2 nav-header-link">
              <AccessAlarmsIcon className="text-light mx-3" />
              Drug Alarm
            </Link>
            <Link to="/logout" className="d-block my-2 nav-header-link">
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
