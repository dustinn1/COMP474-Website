import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import LoginModal from '../../components/accountModals/login';
import RegisterModal from '../../components/accountModals/register';

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
          <h1 className="text-center">Project Manager</h1>
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
        onSwitch={() => {setShowLoginModal(false); setShowRegisterModal(true)}} 
      />
      <RegisterModal 
        show={showRegisterModal} 
        onHide={() => setShowRegisterModal(false)} 
        onSwitch={() => {setShowRegisterModal(false); setShowLoginModal(true)}} 
      />
    </>
  )
}
