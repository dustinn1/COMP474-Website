import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  let handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  let handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  }

  let handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  }

  let handleRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({username: username, password1: password1, password2: password2}),
    })
    .then(() => {
      setUsername('');
      setPassword1('');
      setPassword2('');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="background">
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Container>
        <h1 className="text-center pt-4 pb-2">Register</h1>
        <Form className="pb-5" onSubmit={handleRegister}>
          <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" value={password1} onChange={handlePassword1Change} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formConfirmPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Re-enter Password" value={password2} onChange={handlePassword2Change} />
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
        <p className="text-center">Already have an account?</p>
        <div className="text-center">
          <LinkContainer to="/users/login">
            <Button variant="outline-dark" className="mt-auto">Login</Button>
          </LinkContainer>
        </div>
      </Container>
    </div>
  )
}
