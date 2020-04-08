import React from "react";
import { loadModules } from "esri-loader";
import SideTab from "./sideTab";

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

      //  var popupOpenspaces = {
      //   "title": "{PARK_NAME}",
      //   "content": [{
      //     "type": "fields",
      //     "fieldInfos": [
      //       {
      //         "fieldName": "AGNCY_NAME",
      //         "label": "Agency",
      //         "isEditable": true,
      //         "tooltip": "",
      //         "visible": true,
      //         "format": null,
      //         "stringFieldOption": "text-box"
      //       },
      //       {
      //         "fieldName": "TYPE",
      //         "label": "Type",
      //         "isEditable": true,
      //         "tooltip": "",
      //         "visible": true,
      //         "format": null,
      //         "stringFieldOption": "text-box"
      //       },
      //       {
      //         "fieldName": "ACCESS_TYP",
      //         "label": "Access",
      //         "isEditable": true,
      //         "tooltip": "",
      //         "visible": true,
      //         "format": null,
      //         "stringFieldOption": "text-box"
      //       },
      //       {
      //         "fieldName": "GIS_ACRES",
      //         "label": "Acres",
      //         "isEditable": true,
      //         "tooltip": "",
      //         "visible": true,
      //         "format": {
      //           "places": 2,
      //           "digitSeparator": true
      //         },
      //         "stringFieldOption": "text-box"
      //       }
      //     ]
      //   }]
      // }

      // var openspaces = new FeatureLayer({
      //   url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
      //   outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES"],
      //   popupTemplate: popupOpenspaces
      // });

      const covidCasesLayer = new FeatureLayer({
        url:
          "https://services9.arcgis.com/d81CvrwYLC4eZEWT/arcgis/rest/services/covid_19_egypt_cases/FeatureServer",
        popupTemplate: popupCovidInfo,
      });

      // var trailheads = new FeatureLayer({
      //   url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      //   outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
      //   popupTemplate: popupTrailheads
      // });

      map.add(covidCasesLayer, 0);
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    // return (
    //   <div
    //     className="webmap"
    //     ref={(ele) => (this.mapRef = ele)}
    //     style={{ height: "100vh", width: "100vw" }}
    //   />
    // );
    return (
      <React.Fragment>
        <div className="row no-gutters covid-container">
          <div className="col-12 col-md-2">
            <SideTab governorates={this.state.governorates} />
          </div>
          <div className="col-12 col-md-10">
            <div
              className="webmap"
              ref={(ele) => (this.mapRef = ele)}
              style={{ height: "100vh", width: "100vw" }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map3;
