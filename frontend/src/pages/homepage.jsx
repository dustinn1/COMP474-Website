import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


import LoginModal from '../components/accountModals/login';
import RegisterModal from '../components/accountModals/register';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {FormControl} from "react-bootstrap";

export default function Homepage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);



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
  <br />
        <Helmet>
        <title>Home</title>
      </Helmet>
      <Jumbotron fluid>
        <Container>
          <h1 className="text-center">Welcome to your Project Manager!</h1>
          <div className="d-flex justify-content-center mt-5">
            <Button variant="primary" className="ml-3 mr-3 px-4 py-2" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
            <Button variant="primary" className="ml-3 mr-3 px-4 py-2" onClick={() => setShowRegisterModal(true)}>
              Sign Up
            </Button>
          </div>
        </Container>
      </Jumbotron>
      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
        changeModal={() => {setShowLoginModal(false); setShowRegisterModal(true)}}
      />
      <RegisterModal 
        show={showRegisterModal} 
        onHide={() => setShowRegisterModal(false)} 
        changeModal={() => {setShowRegisterModal(false); setShowLoginModal(true)}} 
      />
    </>
  )
}
