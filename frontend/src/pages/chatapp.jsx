import React from "react";
import ChatApp from "./chat";
import Navigation from '../components/navigation';
import { Card } from "react-bootstrap";
class chatapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };

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
      return <ChatApp username={this.state.username} />;
    }

    // Initial page load, show a simple login form
    return (
      <>
        <Navigation />
        <p></p>
        <Card>
          <form
            onSubmit={this.usernameSubmitHandler}
            className="username-container"
          >
            <h2>Project Manager Instant Chat</h2>
            <p>Enter Username of a member you would like to chat with</p>
            <p></p>
            <div>
              <input
                type="text"
                onChange={this.usernameChangeHandler}
                placeholder="Enter username"
                required
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </Card>
      </>
    );
  }
}
chatapp.defaultProps = {};

export default chatapp;
