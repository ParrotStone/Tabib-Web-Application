import React from "react";

class MessageBox extends React.Component {
  render() {
    return <p className="lead message-box">{this.props.message}</p>;
  }
}

export default MessageBox;
