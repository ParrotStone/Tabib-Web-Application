import React from "react";

class MessageBox extends React.Component {
  render() {
    const { message } = this.props;
    let styles = { padding: "10px" };
    if (!message.length) styles = { padding: "0px" };

    return (
      <p className="message-box" style={styles}>
        {message}
      </p>
    );
  }
}

export default MessageBox;
