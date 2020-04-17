import React from "react";
import MessageBox from "./common/messageBox";
import Swal from "sweetalert2";
import ImgUpload from "../images/img-upload.png";
import http from "../services/httpService";
import {
  apiImgPred,
  apiStartBot,
  apiSearchBot,
  apiAddSelSymptom,
  apiConfirmSymptom,
  apiConfirmSubmitAns,
} from "../config.json";
import { notify, CapitalizeFirstLetter } from "../utils.js";
import { getCurrentUser } from "../services/authService";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

class DiagnosisBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      usrMsg: `Hi ${CapitalizeFirstLetter(
        getCurrentUser().first_name
      )}, I'm Tabib bot, What do you wanna do?`,
      isSearchBoxShown: false,
    };
  }

  // TODO: Remember also to check the packages installed and remove the ones un-necessary especially to (sweetalert thingie) and any un-needed ones in general, also separate the devDependencies from the required ones

  // The asynchronous part is to wait for the user until it uploads an image -- replace the ugly input field with a button(custom one, figure out how to make one -- later of course) + Resolve the padding thing that happen to the logo when the damn loading popup appear/show-up + See what the damn /upload/android doesn't wanna accept the base64 string(returns a 415 unsupported media error) =>> (with content-type already set to => applicatio/json; charset=UTF-8)
  handleSkinClick = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      width: 800,
      scrollbarPadding: false,
      imageUrl: ImgUpload,
      imageWidth: 250,
      imageHeight: 250,
      position: "center",
      imageAlt: "Upload Image",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your image",
      },
    });

    // This part is pretty much useless, but for now, it's okay for it to stay here :)
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        Swal.fire({
          title: "Confirm Upload?",
          scrollbarPadding: false,
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
          onAfterClose: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          if (result) {
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const formData = new FormData();
              formData.append("file", file);
              // Do here the AJAX call to the back-end for image diagnosis
              const headers = {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                "Content-Type": "multipart/form-data",
              };

              const {
                data: { ans },
              } = await http.post(apiImgPred, formData, { headers });

              let predResult = ans.split("is")[1];

              Swal.fire({
                scrollbarPadding: false,
                icon: "info",
                title: "Your results!",
                text: `It is probably ${predResult} skin disease`,
              });
            };
          }
        });
      };
    }
  };

  handleBotClick = () => {
    this.setState({
      usrMsg: "What are you complaining about?",
      isSearchBoxShown: true,
    });
  };

  handleChange = async ({ target }) => {
    // Keep the UI state in sync
    const { value } = target;
    this.setState({ usrMsg: "", searchInput: value });

    // Make requests per every character typed
    if (value.length >= 3) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      };

      try {
        const { searchInput } = this.state;
        await http.get(apiStartBot, { headers });

        const { data } = await http.post(
          apiSearchBot,
          { ans: searchInput },
          { headers }
        );

        console.log(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = ex.response.data;
          const errorsMsg = this.extractErrors(errors);
          notify("error", errorsMsg);
        }
      }
    }
  };

  // Extract this function later
  extractErrors = (errors) => {
    let errorsMsg = "";
    for (const key in errors) {
      errorsMsg += `${errors[key][0]}\n`;
    }

    return errorsMsg;
  };

  render() {
    const { searchInput, usrMsg, isSearchBoxShown } = this.state;

    return (
      <React.Fragment>
        <MessageBox message={usrMsg} />
        {!isSearchBoxShown && (
          <div className="btn-action">
            <button
              className="btn btn-outline-primary d-block mb-3"
              onClick={this.handleBotClick}
            >
              Speak to Tabib Bot
            </button>
            <button
              className="btn btn-outline-primary d-block"
              onClick={this.handleSkinClick}
            >
              Skin Detection
            </button>
          </div>
        )}
        {isSearchBoxShown && (
          <div className="conatiner-fluid search-container">
            <TextField
              id="searchbot-input"
              label="Search Symptoms"
              fullWidth
              autoFocus
              value={searchInput}
              onChange={this.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default DiagnosisBox;
