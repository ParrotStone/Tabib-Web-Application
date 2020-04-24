import React from "react";
import DrugAlarmPopUp from "./drugAlarmPopup";

class DrugAlarm extends React.Component {
  constructor(props) {
    super(props);
    // Empty for now
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <DrugAlarmPopUp />
      </div>
    );
  }
}

export default DrugAlarm;
