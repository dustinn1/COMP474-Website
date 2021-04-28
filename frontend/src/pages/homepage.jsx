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
import {CardGroup, FormControl} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import {faTasks, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine} from "@fortawesome/free-solid-svg-icons/faChartLine";
import {faSmile} from "@fortawesome/free-solid-svg-icons/faSmile";

export default function Homepage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);



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
<p></p>
      <h2 className="text-center text-info">About this Site</h2>

      <CardGroup>

  <Card>

    <FontAwesomeIcon icon={faChartLine} size="8x" style={{ color: 'lightskyblue' }} />
    <Card.Body>
      <Card.Title>Track your projects</Card.Title>
      <Card.Text>
        On this site you can track all of your current and past projects! You can set
        a start date end date of all projects and track your progress.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 5 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
   <FontAwesomeIcon icon={faSmile} size="8x" style={{ color: 'lightseagreen' }} />
    <Card.Body>
      <Card.Title>Connect with others</Card.Title>
      <Card.Text>
        Connect with other collaborators of your projects in one place!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 10 days ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <FontAwesomeIcon icon={faTasks} size="8x" style={{ color: 'powderblue' }} />
    <Card.Body>
      <Card.Title>Project Management</Card.Title>
      <Card.Text>
        This site allows you to manage all projects with ease and all in one place!
          Make an account and try it yourself!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 5 days ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
    </>
  )
}
