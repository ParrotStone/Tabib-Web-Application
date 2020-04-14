import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import MapIcon from "@material-ui/icons/Map";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { apiDownloadProfileImg } from "../config.json";
import defaultUsrImg from "../images/defaultUsrImg.png";
import { getCurrentUser } from "../services/authService";

class UserArea extends React.Component {
  render() {
    const { picture_url } = getCurrentUser();
    const userProfilePic = apiDownloadProfileImg + picture_url;

    return (
      <React.Fragment>
        <div className="container user-area-wrapper row justify-content-center">
          <div className="row">
            <div className="col-12 align-self-center">
              <img
                src={picture_url ? userProfilePic : defaultUsrImg}
                alt="User"
                style={{
                  padding: "5px",
                  width: "200px",
                  background: "white",
                  border: "1px solid white",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <Link to="/profile" className="d-block nav-header-link">
                <PersonIcon className="text-light mx-3" />
                Profile
              </Link>
            </div>
            <div className="col-12">
              <Link to="/coronamap" className="d-block nav-header-link">
                <MapIcon className="text-light mx-3" />
                Corona Map
              </Link>
            </div>
            <div className="col-12">
              <Link to="/drug-alarm" className="d-block nav-header-link">
                <AccessAlarmsIcon className="text-light mx-3" />
                Drug Alarm
              </Link>
            </div>
            <div className="col-12">
              <Link to="/logout" className="d-block nav-header-link">
                <ExitToAppIcon className="text-light mx-3" />
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserArea;
