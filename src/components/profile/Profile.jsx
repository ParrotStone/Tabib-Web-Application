import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import defaultUsrImg from "../../images/defaultUsrImg.png";
import MaterialSpinner from "../common/MaterialSpinner";

import Background from "../common/Background";
import { notify } from "../../utils.js";
import { apiUpdateProfileImg, apiDownloadProfileImg } from "../../config.json";
import http from "../../services/HttpService";
import { getCurrentUser } from "../../services/AuthService";
import { getUserProfile } from "../../services/UserService";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getCurrentUser(),
      isUploading: false,
    };
  }
  // TODO: fix the data stored in the local storage thingie, security issues that come with it(how about the best way to store data locally!)
  // Probably using in-memory variable and sharing across components
  // Extracts it through props, first way
  // Use a local component state, and then extract it(when the component is mounted, the data will be filled automatically)
  // THe props way is better since, it allow a single shared place to get data from(single source of truth)
  // () => this.profilePicture.click() -> Down at the button, this form of call was used because the other is not valid since the input field hasn't been mounted yet, and there's no value in referencing it.
  // Keep note here that the re-render process happen separately(gets called on its own) from the handleUpload() method, thus, it will continue to work properly -- case in point, the handleUpload method will continue to execute from it left on.

  handleUpload = async () => {
    const file = this.profilePicture.files[0];
    if (!file) return;

    this.setState({ isUploading: true });
    const formData = new FormData();
    formData.append("profile_picture", file);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      "content-type": "multipart/formdata",
    };

    // THe the try-catch block is here to account for un-expected errors(when the server crashes, db is down, etc) -- the generic message will be down from the httpService module, but the rejected returned promise value has to be catched somewhere so the app doesn't crash
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
      this.setState({ user, isUploading: false }, () => notify("success", msg));
    } catch (ex) {}
  };

  render() {
    const { user, isUploading } = this.state;
    const userProfilePic = apiDownloadProfileImg + user.picture_url;

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#12a2f9",
        },
      },
    });

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Background />
          <div className="box mt-4 main-diag">
            <ArrowBackIcon
              color="primary"
              style={{
                cursor: "pointer",
                fontSize: "50px",
                margin: "20px 40px 0",
              }}
              onClick={this.props.history.goBack}
            />
            <div className="row no-gutters">
              <div className="col-12 offset-5">
                <div className="align-self-center">
                  <img
                    src={user.picture_url ? userProfilePic : defaultUsrImg}
                    alt="User"
                    style={{ width: "150px", height: "150px" }}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="col-12 offset-5 mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.handleUpload}
                  ref={(el) => (this.profilePicture = el)}
                  className="d-none"
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
              <div className="col-12 mt-4">
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1">
                      <div>
                        <strong>Name:</strong> {user.first_name}
                        <br />
                        <strong>Email:</strong> {user.email}
                        <br />
                        <strong>Phone Number:</strong> +{user.profile.phone}
                        <br />
                        <div className="w-100 mt-4 d-none"></div>
                        <strong>Country:</strong> {user.profile.country}
                        <br />
                        <strong>Birthdate:</strong> {user.profile.dateOfBirth}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Profile;
