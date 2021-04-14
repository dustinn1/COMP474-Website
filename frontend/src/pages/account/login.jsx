import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';

import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:8000/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({username: username, password: password}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, non_field_errors: (data.non_field_errors) ? data.non_field_errors[0] : ''}));
          setErrors(errors => ({...errors, password: (data.password) ? data.password[0] : ''}));
        })
      }
    })  
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container>
        <h1 className="text-center pt-4 pb-2">Login</h1>
        {errors['non_field_errors'] && (
          <p className="form-non-field-invalid">{errors['non_field_errors']}</p>
        )}
        <Form className="pb-5" noValidate onSubmit={handleLogin}>
          <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange}
                isInvalid={errors['non_field_errors'] ? true : false} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}
                isInvalid={(errors['password'] || errors['non_field_errors']) ? true : false} />
              {errors['password'] && (
                <Form.Control.Feedback type="invalid">{errors['password']}</Form.Control.Feedback>
              )}
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
    </>
  )
}
