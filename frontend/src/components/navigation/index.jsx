import React from 'react';
import Cookies from 'js-cookie';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation(props) {
  const handleLogout = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
    })
    .then(() => {
      window.location.replace("/");
    })  
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Project Manager</Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chatapp">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <LinkContainer to="/user/settings">
                <NavDropdown.Item>
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Navbar collapseOnSelect expand="xl" bg="primary" variant="dark">
        <Container style={{flexDirection: 'column'}}>
          <LinkContainer exact to="/">
            <Navbar.Brand>{props.pageTitle}</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </>
  )
}
