import React from "react";
import { loadModules } from "esri-loader";
import SideTab from "./sideTab";
import Button from "@material-ui/core/Button";

class Map3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      governorates: [
        { city: "Alexandria", "infected-cases": 105 },
        { city: "Cairo", "infected-cases": 175 },
        { city: "Kafr-El-Shiekh", "infected-cases": 6 },
        { city: "Asyut", "infected-cases": 17 },
        { city: "Sohag", "infected-cases": 2 },
        { city: "Qena", "infected-cases": 14 },
        { city: "Beni Sueif", "infected-cases": 31 },
        { city: "Aswan", "infected-cases": 75 },
        { city: "Damietta", "infected-cases": 98 },
        { city: "Luxor", "infected-cases": 44 },
        { city: "Giza", "infected-cases": 47 },
        { city: "Sharqia", "infected-cases": 1 },
        { city: "Red Sea", "infected-cases": 61 },
        { city: "South Sinai", "infected-cases": 4 },
        { city: "Suez", "infected-cases": 2 },
        { city: "Qalyubia", "infected-cases": 27 },
        { city: "Port Said", "infected-cases": 26 },
        { city: "New Valley", "infected-cases": 1 },
        { city: "Menoufia", "infected-cases": 32 },
        { city: "Minya", "infected-cases": 34 },
        { city: "Matrouh", "infected-cases": 1 },
        { city: "Beheira", "infected-cases": 10 },
        { city: "Dakahlia", "infected-cases": 32 },
        { city: "Faiyoum", "infected-cases": 2 },
        { city: "Ismailia", "infected-cases": 4 },
        { city: "Gharbia", "infected-cases": 19 },
      ],
      isSideTabOpen: false,
    };
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS -- Helps with performance with initial app load
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"],
      { css: true }
    ).then(([ArcGISMap, MapView, FeatureLayer]) => {
      const map = new ArcGISMap({
        basemap: "dark-gray",
      });

      this.view = new MapView({
        container: this.mapRef,
        map: map,
        center: [31.820553, 29.202498],
        zoom: 7,
      });

      const popupCovidInfo = {
        title: "COVID-19 Cases in {CITY_JUR} governorate",
        outFields: ["infected_cases", "CITY_JUR"],
        content: "Infected Cases: {infected_cases}",
      };

      const covidCasesLayer = new FeatureLayer({
        url:
          "https://services9.arcgis.com/d81CvrwYLC4eZEWT/arcgis/rest/services/covid_19_egypt_cases/FeatureServer",
        popupTemplate: popupCovidInfo,
      });

      map.add(covidCasesLayer, 0);
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }

    // <div
    //   className="webmap"
    //   ref={(ele) => (this.mapRef = ele)}
    //   style={{ height: "100vh", width: "100%" }}
    // />
  }

  // U can toggle the state of the side-tab either using the (ref(recommended to be avoided in the docs) or state(preferred))
  toggleSideTab = () => {
    let { isSideTabOpen } = this.state;
    isSideTabOpen = !isSideTabOpen;
    this.setState({ isSideTabOpen });
  };

  render() {
    const { isSideTabOpen } = this.state;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className={`${isSideTabOpen ? "col-lg-2" : "d-none"}`}>
            <SideTab governorates={this.state.governorates} />
          </div>

          <Button
            variant="contained"
            color="secondary"
            className="corona-btn"
            onClick={this.toggleSideTab}
          >
            {isSideTabOpen ? "Hide" : "Show"} Summary
          </Button>

          <div
            className={`${
              isSideTabOpen ? "col-lg-10" : "col-lg-12"
            } map-container`}
          >
            <div
              className="webmap w-100 h-100"
              ref={(ele) => (this.mapRef = ele)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map3;
