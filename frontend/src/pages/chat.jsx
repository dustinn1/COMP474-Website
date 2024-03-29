import React from "react";
import io from "socket.io-client";

import Messages from "./messages";
import ChatInput from "./ChatInput";
import config from "../index";
import Navigation from '../components/navigation';

require("../pages/ChatApp.css");

class chat extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    // Connect to the server
    this.socket = io(config.api, {
      query: `username=${props.username}`,
    }).connect();

    // Listen for messages from the server
    this.socket.on("server:message", (message) => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message,
    };

    // Emit the message to the server
    this.socket.emit("client:message", messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <>
        <Navigation />
        <div className="chat-app container">
          <h3>You are chatting with John_Doe!</h3>
          <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
      </>
    );
  }
}
chat.defaultProps = {
  username: "Anonymous",
};

export default chat;
