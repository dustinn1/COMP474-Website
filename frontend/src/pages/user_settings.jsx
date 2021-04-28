import React from 'react'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";
import {faUser, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";


export default function UserSettings() {
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
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <Navigation pageTitle="User Settings"/>
      <Container>
        <section>
            <FontAwesomeIcon icon={faUserCircle} size="8x" style={{ color: 'orange' }} />
        </section>
               <Card>
  <Card.Header as="h5">NewUser</Card.Header>
  <Card.Body>
    <Card.Title>Projects</Card.Title>
    <Card.Text>
      SE Project
    </Card.Text>
    <Button onClick={handleLogout} variant="info">Logout</Button>
  </Card.Body>
</Card>
      </Container>

    </>
  )
}
