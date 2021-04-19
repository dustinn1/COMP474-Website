import React from 'react';
import Cookies from 'js-cookie';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';

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
    <Navbar collapseOnSelect expand="xl" bg="primary" variant="dark">
      <Container>
        <LinkContainer exact to="/">
          <Navbar.Brand>{props.pageTitle}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <Dropdown.Header>User</Dropdown.Header>
              <NavDropdown.Divider />
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
