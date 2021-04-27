import React from 'react'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default function UserSettings() {

  return (
    <>
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Project Manager</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Projects</Nav.Link>
      <Nav.Link href="#pricing">Chat</Nav.Link>
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
        </section>
      </Container>
    </>
  )
}
