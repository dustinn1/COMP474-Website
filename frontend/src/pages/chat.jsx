import React from 'react';
import io from 'socket.io-client';


import Messages from './messages';
import ChatInput from './ChatInput';
import config from '/Users/ayatdiab/PycharmProjects/COMP474-Website/frontend/src/index.js';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

require('../pages/ChatApp.css');


class chat extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);

    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

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
          <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Project Manager</Navbar.Brand>
    <Nav className="mr-auto">
        <LinkContainer to="/homepage">
      <Nav.Link href = "">Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/projects">
      <Nav.Link href="">Projects</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/chatapp">
          <Nav.Link href="#chat">Chat</Nav.Link>
        </LinkContainer>

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
      <div className="container">
        <h3>You are chatting with John_Doe!</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
          </>
    );
  }

}
chat.defaultProps = {
  username: 'Anonymous'
};

export default chat;