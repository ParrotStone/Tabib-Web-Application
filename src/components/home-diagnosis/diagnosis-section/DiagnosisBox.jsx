import React, { Fragment } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageIcon from "@material-ui/icons/Image";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { from, BehaviorSubject } from "rxjs";
import { debounceTime, mergeMap } from "rxjs/operators";
import MessageBox from "../../common/MessageBox";
import MaterialSpinner from "../../common/MaterialSpinner";
import http from "../../../services/HttpService";
import {
  apiImgPred,
  apiAppSelSymptom,
  apiGetSymptom,
  apiConfirmSubmitAns,
} from "../../../config.json";
import * as utils from "../../../utils.js";
import { getCurrentUser } from "../../../services/AuthService";
import { startSession, searchSymptoms } from "../../../services/BotService";

let mySwal = withReactContent(Swal);
let searchSympSub = null;
let sympResultObservable = null;

// Custom styles
const iconFontSize = { fontSize: "15rem" };

class DiagnosisBox extends React.Component {
  constructor(props) {
    super(props);

    this.userWelcomeMsg = `Hi ${utils.capitalizeFirstLetter(
      getCurrentUser().first_name
    )}, I'm Tabib bot, How can I help you?`;

    this.state = {
      searchInput: "",
      usrMsgs: [this.userWelcomeMsg],
      showOptions: true,
      isSearchBoxShown: false,
      sympList: [],
      isFetching: false,
      selectedSymptoms: [],
      offerChoice: false,
      isResultReady: false,
    };

    searchSympSub = new BehaviorSubject("");
    sympResultObservable = searchSympSub.pipe(
      debounceTime(250),
      mergeMap((value) => from(searchSymptoms(value)))
    );
  }

  componentDidMount() {
    this.setState({ isFetching: false });
    this.subscription = sympResultObservable.subscribe((result) => {
      // Filter from the already selected symptoms(to not appear again)
      const { selectedSymptoms } = this.state;
      const listOfSymptoms = result.filter(
        (symp) => !selectedSymptoms.includes(symp)
      );
      this.setState({ sympList: listOfSymptoms, isFetching: false });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  // TODO: Remember also to check the packages installed and remove the ones un-necessary especially to (sweetalert thingie) and any un-needed ones in general, also separate the devDependencies from the required ones
  handleSkinClick = () => {
    mySwal.fire({
      html: (
        <Fragment>
          <div className="text-primary">
            <ImageIcon style={iconFontSize} />
          </div>
          <div className="mt-4">
            <input
              type="file"
              onChange={this.handleUpload}
              ref={(el) => (this.imageHolder = el)}
              className="d-none"
              accept="image/*"
              aria-label="Upload your image"
            />
            <button
              onClick={() => this.imageHolder.click()}
              className="btn btn-primary"
            >
              Choose an image
            </button>
          </div>
        </Fragment>
      ),
      showConfirmButton: false,
      width: 700,
      scrollbarPadding: false,
      position: "center",
    });
  };

  handleUpload = async () => {
    mySwal.close();
    this.setState({
      usrMsgs: [""],
      showOptions: false,
      isFetching: true,
      isResultReady: false,
    });

    const file = this.imageHolder.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const { data } = await http.post(apiImgPred, formData, { headers });

      this.setState({
        usrMsgs: [
          utils.getPredictionMsg(data),
          ["Do you want to start a new session?"],
        ],
        showOptions: true,
        isResultReady: true,
        isFetching: false,
      });
    } catch (ex) {
      utils.reportUserErrors(ex);
      this.resetUIToDefault();
    }
  };

  handleBotClick = () => {
    // Initialize the session on the backend API
    startSession();

    this.setState({
      usrMsgs: ["What are you complaining about?"],
      showOptions: false,
      isSearchBoxShown: true,
      isResultReady: false,
    });
  };

  handleChange = ({ target }) => {
    // Keep the UI state in sync
    const { value } = target;
    this.setState({ searchInput: value, usrMsgs: [""], isFetching: true });
    searchSympSub.next(value.trim());
  };

  // Spinners + The part about the damn start http request every time starting again(what solution you could do here??) + the spaces thingie in the search bar

  handleSymptomClick = ({ target }) => {
    const symptomValue = target.textContent;
    const selectedSymp = [...this.state.selectedSymptoms];
    selectedSymp.push(symptomValue);
    this.setState({
      searchInput: "",
      usrMsgs: ["Do you want to add another symptom?"],
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
      usrMsgs: [""],
      showOptions: false,
      isSearchBoxShown: false,
      isFetching: true,
      offerChoice: false,
    });

    if (choice === "yes") {
      if (selectedSymptoms.length) {
        this.setState({
          usrMsgs: ["What are you complaining about?"],
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
            usrMsgs: [`Do you have the following symptom: ${symptom}?`],
            isFetching: false,
            offerChoice: true,
          });
          return;
        } else {
          this.setState({
            usrMsgs: [
              utils.getPredictionMsg(data),
              ["Do you want to start a new session?"],
            ],
            showOptions: true,
            isSearchBoxShown: false,
            isFetching: false,
            offerChoice: false,
            isResultReady: true,
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
        // Send the list of symptoms one-by-one(Network costly operation ahead!)
        for (let i = 0; i < selectedSymptoms.length; i++) {
          let symptom = selectedSymptoms[i].split(" ").join("_");
          await http.post(apiAppSelSymptom, { ans: symptom });
        }

        const { data } = await http.get(apiGetSymptom);

        if (data.result) {
          const symptom = data["result"].split("_").join(" ");
          this.setState({
            usrMsgs: [`Do you have the following symptom: ${symptom}?`],
            showOptions: false,
            isFetching: false,
            selectedSymptoms: [],
            offerChoice: true,
          });
          return;
        } else {
          this.setState({
            usrMsgs: [
              utils.getPredictionMsg(data),
              ["Do you want to start a new session?"],
            ],
            showOptions: true,
            isSearchBoxShown: false,
            isFetching: false,
            selectedSymptoms: [],
            offerChoice: false,
            isResultReady: true,
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

  resetUIToDefault = () => {
    this.setState({
      searchInput: "",
      usrMsgs: [this.userWelcomeMsg],
      showOptions: true,
      isSearchBoxShown: false,
      sympList: [],
      isFetching: false,
      selectedSymptoms: [],
      offerChoice: false,
      isResultReady: false,
    });
  };

  render() {
    const {
      searchInput,
      usrMsgs,
      showOptions,
      isSearchBoxShown,
      sympList,
      isFetching,
      offerChoice,
      isResultReady,
    } = this.state;

    return (
      <React.Fragment>
        <div className="diagnosis-box h-100">
          <div
            className={`text-right mt-3 mx-3 ${
              isFetching ? "d-block" : "d-none"
            }`}
          >
            <MaterialSpinner thickness={3} />
          </div>
          <MessageBox
            message={usrMsgs}
            isResultReady={isResultReady}
            showDiseaseInfo={this.props.showDiseaseInfo}
          />
          <div className="container mt-1 mx-2">
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
            {!sympList.length && !usrMsgs[0] && !isFetching && (
              <h1 className="text-primary">Not Matching Symptom</h1>
            )}
          </div>
          {!isSearchBoxShown && !offerChoice && showOptions && (
            <div className="btn-action">
              <button
                className="btn btn-outline-primary pill-border d-block mb-2"
                onClick={this.handleBotClick}
              >
                Talk to Tabib Bot
              </button>
              <button
                className="btn btn-outline-primary pill-border d-block mb-2"
                onClick={this.handleSkinClick}
              >
                Skin Detection
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
            <div className="search-container d-flex">
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
                  fontSize: "35px",
                  margin: "29px 0 0 20px",
                }}
                onClick={() => this.resetUIToDefault()}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DiagnosisBox;
