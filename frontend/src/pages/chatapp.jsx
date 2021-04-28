

import React from 'react';
import ChatApp from './chat';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import {Container, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class chatapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now show the main App
      return (
        <ChatApp username={this.state.username} />
      );
    }

    // Initial page load, show a simple login form
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
   <Container>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
   </Container>
  </Navbar>
            <p></p>
     <card>
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <h2>Project Manager Instant Chat</h2>
          <p>Enter Username of a member you would like to chat with</p>
          <p></p>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Enter username"
            required />
        </div>
        <input type="submit" value="Submit" />

      </form>
       </card>

          </>
    );
  }

}
chatapp.defaultProps = {
};

export default chatapp;