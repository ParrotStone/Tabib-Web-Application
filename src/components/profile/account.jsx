import React from "react";
import Background from "../common/background";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

class Account extends React.Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#12a2f9"
        }
      }
    });

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Background />
          <div className="reg-box mt-3 main-diag">
            <Link to="/homie">
              <ArrowBackIcon
                color="primary"
                style={{
                  fontSize: "50px",
                  margin: "20px 40px 0"
                }}
              />
            </Link>
            <div className="d-flex flex-column mt-n4">
              <div className="emu-pic align-self-center"></div>
            </div>
          </div>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Account;
