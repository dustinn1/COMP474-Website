import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet';

export default function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrf, setCsrf] = useState('');

  let handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  let handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  let isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  let getCSRF = () => {
    fetch("http://localhost:8000/api/csrf/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      setCsrf(csrfToken);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    //getCSRF();
    fetch("http://localhost:8000/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRFToken": {csrf},
      },
      credentials: "include",
      body: JSON.stringify(username, {username}, password, {password}),
    })
    .then(isResponseOk)
    .then((data) => {
      console.log(data);
      setUsername('');
      setPassword('');
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
        <h1 className="text-center pt-4 pb-2">Login</h1>
        <Form className="pb-5" onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-primary" type="submit">
              Log in
            </Button>
          </div>
        </Form>
        <p className="text-center">Don't have an account?</p>
        <div className="text-center">
          <LinkContainer to="/users/register">
            <Button variant="outline-dark" className="mt-auto">Sign up</Button>
          </LinkContainer>
        </div>
      </Container>
    </div>
  )
}
