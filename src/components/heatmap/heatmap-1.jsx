import React from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

import utils from "../../utils";

class Map extends React.Component {
  componentDidMount() {
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
