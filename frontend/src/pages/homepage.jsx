import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import LoginModal from '../components/accountModals/login';
import RegisterModal from '../components/accountModals/register';
import {CardGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {faTasks} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine} from "@fortawesome/free-solid-svg-icons/faChartLine";
import {faSmile} from "@fortawesome/free-solid-svg-icons/faSmile";

export default function Homepage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);



  return (
    <>
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
    <FontAwesomeIcon icon={faTasks} size="8x" style={{ color: 'lightsteelblue' }} />
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
