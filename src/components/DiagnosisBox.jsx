import React from "react";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { from, BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, mergeMap } from "rxjs/operators";
import MessageBox from "./common/MessageBox";
import ImgUpload from "../images/img-upload.png";
import MaterialSpinner from "./common/MaterialSpinner";
import http from "../services/HttpService";
import {
  apiImgPred,
  apiAppSelSymptom,
  apiGetSymptom,
  apiConfirmSubmitAns,
} from "../config.json";
import * as utils from "../utils.js";
import { getCurrentUser } from "../services/AuthService";
import { searchSymptoms } from "../services/BotService";

const searchSympSub = new BehaviorSubject("");
const sympResultObservable = searchSympSub.pipe(
  debounceTime(350),
  distinctUntilChanged(),
  mergeMap((value) => from(searchSymptoms(value)))
);

class DiagnosisBox extends React.Component {
  constructor(props) {
    super(props);

    this.userWelcomeMsg = `Hi ${utils.capitalizeFirstLetter(
      getCurrentUser().first_name
    )}, I'm Tabib bot, What do you wanna do?`;

    this.state = {
      searchInput: "",
      usrMsg: this.userWelcomeMsg,
      showOptions: true,
      isSearchBoxShown: false,
      sympList: [],
      isFetching: false,
      selectedSymptoms: [],
      offerChoice: false,
    };
  }

  componentDidMount() {
    this.subscription = sympResultObservable.subscribe((result) => {
      this.setState({ sympList: result, isFetching: false });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
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
      showOptions: false,
      isSearchBoxShown: true,
    });
  };

  handleChange = async ({ target }) => {
    // Keep the UI state in sync
    const { value } = target;
    this.setState({ searchInput: value, usrMsg: "", isFetching: true });
    searchSympSub.next(value);

    if (!value.length) {
      this.setState({ isFetching: false });
      return;
    }
  };

  // Spinners + The part about the damn start http request every time starting again(what solution you could do here??) + the spaces thingie in the search bar

  handleSymptomClick = ({ target }) => {
    const symptomValue = target.textContent;
    const selectedSymp = [...this.state.selectedSymptoms];
    selectedSymp.push(symptomValue);
    this.setState({
      searchInput: "",
      usrMsg: "Do you want to add another symptom?",
      showOptions: false,
      isSearchBoxShown: false,
      sympList: [],
      selectedSymptoms: selectedSymp,
      offerChoice: true,
    });
  };

  handleChoice = async ({ target }) => {
    const { selectedSymptoms } = this.state;
    const choice = target.textContent.toLowerCase();

    this.setState({
      showOptions: false,
      isSearchBoxShown: false,
      isFetching: true,
      offerChoice: false,
    });

    if (choice === "yes") {
      if (selectedSymptoms.length) {
        this.setState({
          usrMsg: "What are you complaining about?",
          showOptions: false,
          isSearchBoxShown: true,
          isFetching: false,
          offerChoice: false,
        });

        return;
      }

      try {
        await http.post(apiConfirmSubmitAns, { ans: "y" });
        const { data } = await http.get(apiGetSymptom);

        if (data.result) {
          const symptom = data["result"].split("_").join(" ");
          this.setState({
            usrMsg: `Do you have the following symptom: ${symptom}?`,
            isFetching: false,
            offerChoice: true,
          });
          return;
        } else {
          this.setState({
            usrMsg: utils.getPredictionMsg(data),
            showOptions: true,
            isSearchBoxShown: false,
            isFetching: false,
            offerChoice: false,
          });
          return;
        }
      } catch (ex) {
        utils.reportUserErrors(ex);
      }
    }

    if (choice === "no") {
      if (!selectedSymptoms.length) {
        try {
          await http.post(apiConfirmSubmitAns, { ans: "n" });
        } catch (ex) {
          utils.reportUserErrors(ex);
        }
      }

      try {
        // No need to start the session again - ASK AZ
        // await http.get(apiStartBot);
        // Send the list of symptoms one-by-one(Network costly operation ahead!)
        for (let i = 0; i < selectedSymptoms.length; i++) {
          let symptom = selectedSymptoms[i].split(" ").join("_");
          await http.post(apiAppSelSymptom, { ans: symptom });
        }

        const { data } = await http.get(apiGetSymptom);

        if (data.result) {
          const symptom = data["result"].split("_").join(" ");
          this.setState({
            usrMsg: `Do you have the following symptom: ${symptom}?`,
            showOptions: false,
            isFetching: false,
            selectedSymptoms: [],
            offerChoice: true,
          });
          return;
        } else {
          this.setState({
            usrMsg: utils.getPredictionMsg(data),
            showOptions: true,
            isSearchBoxShown: false,
            isFetching: false,
            selectedSymptoms: [],
            offerChoice: false,
          });
          return;
        }
      } catch (ex) {
        utils.reportUserErrors(ex);
      }

      this.setState({
        showOptions: true,
        isFetching: false,
        offerChoice: false,
      });
    }
  };

  handleSearchClick = () => {
    console.log("search button clicked");
  };

  render() {
    const {
      searchInput,
      usrMsg,
      showOptions,
      isSearchBoxShown,
      sympList,
      isFetching,
      offerChoice,
    } = this.state;
    const isResultReady =
      Array.isArray(usrMsg) || usrMsg.includes("couldn't find");

    return (
      <React.Fragment>
        <div className="diagnosis-box">
          <div
            className={`text-right mt-4 mx-4 ${
              isFetching ? "d-block" : "d-none"
            }`}
          >
            <MaterialSpinner thickness={3} />
          </div>
          <MessageBox
            message={usrMsg}
            left={isResultReady ? false : true}
            bottom={isResultReady ? true : false}
            secondMsg={false}
            result={null}
          />
          {isResultReady && (
            <MessageBox
              message={"Do you want to try again?"}
              left={true}
              bottom={false}
              secondMsg={true}
              result={usrMsg}
            />
          )}
          <div className="conatiner mt-4 mx-2">
            {!isFetching &&
              sympList.map((symptom, index) => (
                <button
                  key={index}
                  className="btn btn-outline-primary pill-border d-inline-block mx-1 mb-2"
                  onClick={this.handleSymptomClick}
                >
                  {symptom}
                </button>
              ))}
            {!sympList.length && !usrMsg && !isFetching && (
              <h1 className="text-primary">Not Matching Symptom</h1>
            )}
          </div>
          {!isSearchBoxShown && !offerChoice && showOptions && (
            <div className="btn-action">
              <button
                className="btn btn-outline-primary pill-border d-block mb-2"
                onClick={this.handleBotClick}
              >
                Speak to Tabib Bot
              </button>
              <button
                className="btn btn-outline-primary pill-border d-block mb-2"
                onClick={this.handleSkinClick}
              >
                Skin Detection
              </button>
              <button
                className="btn btn-outline-primary pill-border d-block"
                onClick={this.handleSearchClick}
              >
                Disease Search
              </button>
            </div>
          )}
          {offerChoice && (
            <div className="btn-action-choice">
              <button
                className="btn btn-outline-primary pill-border d-block mb-2"
                onClick={this.handleChoice}
              >
                Yes
              </button>
              <button
                className="btn btn-outline-primary pill-border d-block"
                onClick={this.handleChoice}
              >
                No
              </button>
            </div>
          )}
          {isSearchBoxShown && (
            <div className="conatiner-fluid search-container d-flex">
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
              <ArrowForwardIcon
                color="primary"
                style={{
                  cursor: "pointer",
                  fontSize: "40px",
                  margin: "25px 0 0 30px",
                }}
                onClick={() =>
                  this.setState({
                    searchInput: "",
                    usrMsg: this.userWelcomeMsg,
                    showOptions: true,
                    isSearchBoxShown: false,
                    sympList: [],
                    isFetching: false,
                    selectedSymptoms: [],
                    offerChoice: false,
                  })
                }
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DiagnosisBox;
