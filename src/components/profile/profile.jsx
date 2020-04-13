import React from "react";
import Background from "../common/background";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import defaultUsrImg from "../../images/defaultUsrImg.png";

class Profile extends React.Component {
  componentDidMount() {
    // TODO: fix the data stored in the local storage thingie, security issues that come with it(how about the best way to store data locally!)
    // Probably using in-memory variable and sharing across components
    // Extracts it through props, first way
    // Use a local component state, and then extract it(when the component is mounted, the data will be filled automatically)
    // THe props way is better since, it allow a single shared place to get data from(single source of truth)
  }

  render() {
    const { user } = this.props;

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
                    src={user.picture_url ? user.picture_url : defaultUsrImg}
                    alt="User"
                    style={{ width: "150px" }}
                    className="border rounded"
                  />
                </div>
              </div>
              <div className="col-12 offset-5 mt-3">
                <input type="file" name="" id="" />
              </div>
              <div className="col-12 mt-5">
                <div className="container">
                  <div className="row">
                    <div className="col-4 offset-2">
                      Name: {user.first_name}
                      <br />
                      Email: {user.email}
                      <br />
                      Phone Number: +{user.profile.phone}
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
