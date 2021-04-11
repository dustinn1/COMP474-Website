import React from 'react';

import { LinkContainer } from "react-router-bootstrap";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Project Manger</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/*
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer> */}
          </Nav>
          <Nav>
            <LinkContainer exact to="/account">
              <Nav.Link>Account</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
