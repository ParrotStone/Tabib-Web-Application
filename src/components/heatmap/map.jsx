import React from "react";
// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

import utils from "../../utils";

// const InitialMap = (props) => {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 26.494184, lng: 29.871903 }}
//     />
//   );
// };

// const WrappedMap = withScriptjs(withGoogleMap(InitialMap));

// const Map = (props) => {
//   console.log(process.env.REACT_APP_GOOGLE_MAPS_KEY);
//   // Configure a customized styles later.
//   const styles = { height: "100vh", width: "100vw" };
//   return (
//     <div style={styles}>
//       <WrappedMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=visualization`}
//         loadingElement={<div style={styles} />}
//         containerElement={<div style={styles} />}
//         mapElement={<div style={styles} />}
//       />
//     </div>
//   );
// };

class Map extends React.Component {
  componentDidMount() {
    const options = {
      idleTimePress: 100,
      minNumberOfCharacters: 3,
      searchOptions: {
        key: "<your-tomtom-search-key>",
        language: "en-US",
      },
      autocompleteOptions: {
        key: "<your-tomtom-search-key>",
        language: "en-US",
      },
      noResultsMessage: "No results found.",
    };

    // Initializing the tomtom map
    const map = tt.map({
      container: this.map,
      key: "qNqfL1AmlgD7z0x1SzmanP741kiRNyCa",
      language: "en-US",
      center: [31.820553, 27.802498],
      style: "tomtom://vector/1/basic-main",
      zoom: 5.5,
      dragPan: !utils.isMobileOrTablet(),
    });

    map.addControl(new tt.FullscreenControl());
  }

  render() {
    const styles = {
      height: "100vh",
      width: "100vw",
    };

    return <div id="map" ref={(ele) => (this.map = ele)} style={styles} />;
  }
}

export default Map;
