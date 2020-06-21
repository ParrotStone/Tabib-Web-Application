import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import MapIcon from "@material-ui/icons/Map";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DrugAlarmPopUp from "../../drug-alarm/DrugAlarmPopup";
import SearchDiseasePopup from "./SearchDiseasePopup";
import SearchIcon from "@material-ui/icons/Search";
import CircleContentPlaceholder from "../../common/CircleContentPlaceholder";
import { apiDownloadProfileImg } from "../../../config.json";
import defaultUsrImg from "../../../images/defaultUsrImg.png";
import { getCurrentUser } from "../../../services/AuthService";

const profileImgStyles = {
  padding: "4px",
  width: "200px",
  background: "white",
  borderRadius: "50%",
};

class SideOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: defaultUsrImg,
      isLoading: true,
      show: false,
      showAlarms: false,
    };
  }

  componentDidMount() {
    const { picture_url } = getCurrentUser();
    const userProfilePic = apiDownloadProfileImg + picture_url;
    const { imgSrc } = this.state;

    this.setState({ imgSrc: picture_url ? userProfilePic : imgSrc });
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
    const { imgSrc, isLoading, show, showAlarms } = this.state;

    const {
      showDiseasePopup,
      setShowDiseasePopup,
      requestedDiseaseInfo,
      showDiseaseInfo,
    } = this.props;

    return (
      <>
        <div className="container user-area-wrapper row justify-content-center">
          <div className="row">
            <div
              className={`col-12 align-self-center ${
                isLoading ? "profile-img-container" : ""
              }`}
            >
              {isLoading && (
                <CircleContentPlaceholder speed={1} foregroundColor="#e0e0e0" />
              )}
              <img
                onLoad={() => this.setState({ isLoading: false })}
                onError={() => this.setState({ isLoading: true })}
                src={imgSrc}
                alt="User Profile Pic"
                style={profileImgStyles}
                className={`usr-profile-img ${isLoading ? "d-none" : ""}`}
                onClick={() => this.props.setIsProfileShown(true)}
              />
            </div>
          </div>
          {!isLoading && (
            <div className="row mt-2">
              <div className="col-6">
                <a
                  href="#profile"
                  className="d-block nav-header-link"
                  onClick={(ev) =>
                    ev.preventDefault() || this.props.setIsProfileShown(true)
                  }
                >
                  <PersonIcon className="text-light mx-3" />
                  Profile
                </a>
              </div>
              <div className="col-8">
                <Link to="/coronamap" className="d-block nav-header-link">
                  <MapIcon className="text-light mx-3" />
                  Corona Map
                </Link>
              </div>
              <div className="col-8">
                <a
                  href="#disease-search"
                  className="d-block nav-header-link"
                  onClick={() => setShowDiseasePopup(true)}
                >
                  <SearchIcon className="text-light mx-3" />
                  Disease Search
                </a>
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
          )}
        </div>

        <DrugAlarmPopUp
          show={show}
          handleClose={this.handleClosePopup}
          showAlarms={showAlarms}
          handleHideAlarms={this.handleHideAlarms}
          handleShowPopup={this.handleShowPopup}
        />

        <SearchDiseasePopup
          show={showDiseasePopup}
          handleClosePopup={setShowDiseasePopup}
          showDiseaseInfo={showDiseaseInfo}
          requestedDiseaseInfo={requestedDiseaseInfo}
        />
      </>
    );
  }
}

export default SideOptions;
