import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import defaultUsrImg from "../../../images/defaultUsrImg.png";
import MaterialSpinner from "../../common/MaterialSpinner";
import RectContentPlaceholder from "../../common/RectContentPlaceholder";
import { notify } from "../../../utils.js";
import {
  apiUpdateProfileImg,
  apiDownloadProfileImg,
} from "../../../config.json";
import http from "../../../services/HttpService";
import { getCurrentUser } from "../../../services/AuthService";
import { getUserProfile } from "../../../services/UserService";

const arrowBackStyles = {
  cursor: "pointer",
  fontSize: "40px",
  margin: "20px 20px 0",
};
const userProfileStyles = { width: "150px", height: "150px" };

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getCurrentUser(),
      imgSrc: defaultUsrImg,
      isLoading: true,
      isUploading: false,
    };
  }

  componentDidMount() {
    const {
      user: { picture_url },
    } = this.state;
    const userProfilePic = apiDownloadProfileImg + picture_url;

    this.setState({ imgSrc: picture_url ? userProfilePic : defaultUsrImg });
  }

  // TODO: fix the data stored in the local storage thingie, security issues that come with it(how about the best way to store data locally!)
  // Probably using in-memory variable and sharing across components
  // TODO: See if there's a better way to check for empty files down here and also to take input instead of checking constantly for a change on the file input
  handleUpload = async () => {
    const file = this.profilePicture.files[0];
    if (!file) return;

    this.setState({ isUploading: true });
    const formData = new FormData();
    formData.append("profile_picture", file);

    const headers = {
      "content-type": "multipart/formdata",
    };

    try {
      const {
        data: { detail: msg },
      } = await http.post(apiUpdateProfileImg, formData, {
        headers,
      });

      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      const { data: user } = await getUserProfile(accessToken, refreshToken);

      localStorage.setItem("user", JSON.stringify(user));
      const { picture_url } = user;
      const userProfilePic = apiDownloadProfileImg + picture_url;

      this.setState(
        {
          user,
          imgSrc: userProfilePic,
          isLoading: true,
          isUploading: false,
        },
        () => notify("success", msg)
      );
    } catch (ex) {
      this.setState({ isUploading: false });
    }
  };

  render() {
    const { setIsProfileShown } = this.props;
    const { user, imgSrc, isLoading, isUploading } = this.state;

    return (
      <React.Fragment>
        <div className="box whole-diag-box w-50">
          <ArrowBackIcon
            color="primary"
            style={arrowBackStyles}
            onClick={() => setIsProfileShown(false)}
          />
          <div className="row no-gutters">
            <div className="col-12 offset-5">
              <div className="align-self-center">
                {isLoading && (
                  <RectContentPlaceholder speed={1} foregroundColor="#e0e0e0" />
                )}
                <img
                  onLoad={() => this.setState({ isLoading: false })}
                  onError={() => this.setState({ isLoading: true })}
                  src={imgSrc}
                  alt="User Profile Pic"
                  style={userProfileStyles}
                  className={`rounded ${isLoading ? "d-none" : ""}`}
                />
              </div>
            </div>
            <div className="col-12 offset-5 mt-3">
              <input
                type="file"
                onChange={this.handleUpload}
                ref={(el) => (this.profilePicture = el)}
                className="d-none"
                accept="image/*"
                aria-label="Upload your profile picture"
              />
              <button
                onClick={() => this.profilePicture.click()}
                className="btn btn-primary"
                style={{ width: "150px" }}
                disabled={isUploading}
              >
                <span className={`${isUploading ? "d-none" : "d-block"}`}>
                  Upload a Photo
                </span>
                <MaterialSpinner
                  size={20}
                  thickness={4}
                  className={`mx-auto ${
                    isUploading ? "d-block" : "d-none"
                  } text-white`}
                />
              </button>
            </div>
            <div className="col-12 usr-info wide-border-left wide-border-right pill-border bg-shadow-container p-3">
              <div className="container">
                <div className="row">
                  <div className="col-5 offset-1">
                    <strong>Name:</strong> {user.first_name}
                    <br />
                    <strong>Email:</strong> {user.email}
                    <br />
                    <strong>Phone Number:</strong> +{user.profile.phone}
                  </div>
                  <div className="col-5 offset-1">
                    <strong>Country:</strong> {user.profile.country}
                    <br />
                    <strong>Birthdate:</strong> {user.profile.dateOfBirth}
                    <br />
                    <strong>Gender: </strong>
                    {user.profile.gender.toUpperCase() === "M"
                      ? "Male"
                      : "Female"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
