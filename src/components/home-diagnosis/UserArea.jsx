import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import MapIcon from "@material-ui/icons/Map";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { apiDownloadProfileImg } from "../../config.json";
import defaultUsrImg from "../../images/defaultUsrImg.png";
import { getCurrentUser } from "../../services/AuthService";

import DrugAlarmPopUp from "../drug-alarm/DrugAlarmPopup";

class UserArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showAlarms: false,
    };
  }

  handleClosePopup = () => {
    this.setState({ show: false });
  };

  handleShowPopup = (ev) => {
    ev.preventDefault();

    this.setState({ show: true, showAlarms: true });
  };

  handleHideAlarms = () => {
    this.setState({ showAlarms: false });
  };

  render() {
    const { picture_url } = getCurrentUser();
    const userProfilePic = apiDownloadProfileImg + picture_url;
    const { show, showAlarms } = this.state;

    return (
      <>
        <div className="container user-area-wrapper row justify-content-center">
          <div className="row">
            <div className="col-12 align-self-center">
              <img
                src={picture_url ? userProfilePic : defaultUsrImg}
                alt="User Profile Pic"
                style={{
                  padding: "5px",
                  width: "200px",
                  background: "white",
                  borderRadius: "50%",
                }}
                className="usr-profile-img"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <Link to="/profile" className="d-block nav-header-link">
                <PersonIcon className="text-light mx-3" />
                Profile
              </Link>
            </div>
            <div className="col-8">
              <Link to="/coronamap" className="d-block nav-header-link">
                <MapIcon className="text-light mx-3" />
                Corona Map
              </Link>
            </div>
            <div className="col-8">
              <a
                href="#drug-alarm"
                className="d-block nav-header-link"
                onClick={this.handleShowPopup}
              >
                <AccessAlarmsIcon className="text-light mx-3" />
                Drug Alarm
              </a>
            </div>
            <div className="col-7">
              <Link to="/logout" className="d-block nav-header-link">
                <ExitToAppIcon className="text-light mx-3" />
                Sign out
              </Link>
            </div>
          </div>
        </div>

        <DrugAlarmPopUp
          show={show}
          handleClose={this.handleClosePopup}
          showAlarms={showAlarms}
          handleHideAlarms={this.handleHideAlarms}
          handleShowPopup={this.handleShowPopup}
        />
      </>
    );
  }
}

export default UserArea;
