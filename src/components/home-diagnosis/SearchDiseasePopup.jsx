import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
// import { from, BehaviorSubject } from "rxjs";
// import { debounceTime, distinctUntilChanged, mergeMap } from "rxjs/operators";
import MaterialSpinner from "../common/MaterialSpinner";

import { submitDiseaseName } from "../../services/BotService.js";

const modalBodyStyles = {
  height: "400px",
  overflowY: "scroll",
};

const fontSizeHeaderIcon = {
  fontSize: "2.7rem",
};

const centerMiddleStyles = {
  height: "50%",
  transform: "translateY(50%)",
  display: "flex !important",
  justifyContent: "center",
  alignItems: "center",
};

// Material-UI custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 800,
    margin: "30px auto 0px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  autoCompleteList: {
    textAlign: "left",
    padding: "5px 30px",
    width: 800,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  resultContainer: {
    width: 800,
    margin: "auto",
  },
}));

// const searchSubj = new BehaviorSubject("");
// const searchResultObservable = searchSubj.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   mergeMap((value) => from(searchDiseases(value)))
// );

// const useObservable = (observable, setter, setIsFetching) => {
//   React.useEffect(() => {
//     const subscription = observable.subscribe((result) => {
//       setter(result);
//       setIsFetching(false);
//     });
//     return () => subscription.unsubscribe();
//   }, [observable, setter, setIsFetching]);
// };

const diseaseList = JSON.parse(localStorage.getItem("disease-list"));

const SearchDiseasePopup = ({
  show,
  handleClosePopup,
  requestedDiseaseInfo,
  showDiseaseInfo,
}) => {
  const [searchVal, setSearchVal] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [diseases, setDiseases] = useState([]);
  // Disease info details
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseInfo, setDiseaseInfo] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [organs, setOrgans] = useState([]);
  const [humanSys, setHumanSys] = useState([]);
  const classes = useStyles();

  // In order to handle the case where the 'more-info' label was clicked
  useEffect(() => {
    if (requestedDiseaseInfo)
      handleChosenDisease({ target: { textContent: requestedDiseaseInfo } });
  }, [requestedDiseaseInfo]);

  const resetUIToDefault = () => {
    // Rest the UI back to default values
    setDiseases([]);
    setDiseaseName("");
    setDiseaseInfo("");
    setTreatments([]);
    setSymptoms([]);
    setOrgans([]);
    setHumanSys([]);
  };

  // useObservable(searchResultObservable, setDiseases, setIsFetching);
  const filterThroughList = (value) => {
    if (!value.length) {
      setDiseases([]);
      return;
    }

    resetUIToDefault();

    setDiseases(
      diseaseList
        .filter((disease) =>
          disease.toUpperCase().includes(value.toUpperCase())
        )
        .slice(0, 5)
    );
  };

  const handleChosenDisease = async ({ target }) => {
    const { textContent: diseaseName } = target;
    setSearchVal(diseaseName);
    setDiseases([]);
    setIsFetching(true);
    const diseaseDetails = await submitDiseaseName(diseaseName.trim());
    setIsFetching(false);
    setDiseaseName(diseaseDetails["name"]);
    setDiseaseInfo(diseaseDetails["info"]);
    setTreatments(diseaseDetails["treatments"]);
    setSymptoms(diseaseDetails["symptomps"]);
    setOrgans(diseaseDetails["organs"]);
    setHumanSys(diseaseDetails["humanSystems"]);
  };

  const handleEnterPress = (ev) => {
    ev.preventDefault();
    // Simulate a user click on the first auto-complete list item
    handleChosenDisease({ target: { textContent: diseases[0] } });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClosePopup}
        onEnter={() =>
          requestedDiseaseInfo ? null : setSearchVal("") || resetUIToDefault()
        }
        onExited={() =>
          (requestedDiseaseInfo
            ? null
            : setSearchVal("") || resetUIToDefault()) ||
          showDiseaseInfo(false, "")
        }
        aria-labelledby="drug-alarm-modal"
        dialogClassName="drug-alarm-width-70"
        centered
      >
        <Modal.Header
          closeButton
          className="flex-column-reverse align-items-center"
        >
          <Modal.Title className="text-primary text-center">
            <h1>
              <InfoIcon style={fontSizeHeaderIcon} className="mt-n2" /> Search
              for disease info
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalBodyStyles}>
          <Paper
            component="form"
            onSubmit={handleEnterPress}
            className={`bg-shadow-container ${classes.root}`}
          >
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              id="disease-name"
              className={classes.input}
              placeholder="Disease name..."
              value={searchVal}
              onChange={({ target }) =>
                setSearchVal(target.value) || filterThroughList(target.value)
              }
              label="Disease name..."
            />
          </Paper>
          {diseases.length ? (
            <div className={classes.autoCompleteList}>
              {diseases.map((disease, index) => (
                <p
                  key={index}
                  className="disease-item py-2"
                  onClick={handleChosenDisease}
                >
                  <span className="text-secondary mr-5">
                    <InfoIcon />
                  </span>
                  {disease}
                </p>
              ))}
            </div>
          ) : null}
          {!diseases.length && !isFetching && !diseaseName && (
            <div style={centerMiddleStyles}>
              <h1 className="text-primary text-center">
                {" "}
                <ErrorOutlineIcon fontSize="large" /> Nothing Found
              </h1>
            </div>
          )}
          {diseaseName && diseaseInfo && (
            <div className={classes.resultContainer}>
              <h1 className="text-white text-center pill-border bg-primary p-4 mt-4 mb-4">
                {diseaseName}
              </h1>
              <div className="mb-5">
                <h4 className="text-primary w-50">Overview</h4>
                <div className="wide-border-left bg-shadow-container p-3">
                  {diseaseInfo}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-primary">Human Systems</h4>
                <div className="wide-border-left bg-shadow-container p-3">
                  {humanSys.map((sys, index) => (
                    <p key={index}>- {sys}</p>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-primary">Affected Organs</h4>
                <div className="wide-border-left bg-shadow-container p-3">
                  {organs.map((organ, index) => (
                    <p key={index}>- {organ}</p>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-primary">Symptoms</h4>
                <div className="wide-border-left bg-shadow-container p-3">
                  {symptoms.map((symptom, index) => (
                    <p key={index}>- {symptom}</p>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-primary">Treatment</h4>
                <div className="wide-border-left bg-shadow-container p-3">
                  {treatments.map((treatment, index) => (
                    <p key={index}>- {treatment}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div
            className={`text-center mx-4 ${isFetching ? "d-block" : "d-none"}`}
            style={centerMiddleStyles}
          >
            <MaterialSpinner size={60} thickness={2} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchDiseasePopup;
