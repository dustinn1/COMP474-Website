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
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  }

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  }

  const handleRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({username: username, password1: password1, password2: password2}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, non_field_errors: (data.non_field_errors) ? data.non_field_errors[0] : ''}));
          setErrors(errors => ({...errors, username: (data.username) ? data.username[0] : ''}));
          setErrors(errors => ({...errors, password1: (data.password1) ? data.password1[0] : ''}));
          setErrors(errors => ({...errors, password2: (data.password2) ? data.password2[0] : ''}));
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
        <title>Account</title>
      </Helmet>
      <Container>
        <h1 className="text-center pt-4 pb-2">Register</h1>
        {errors['non_field_errors'] && (
          <p className="form-non-field-invalid">{errors['non_field_errors']}</p>
        )}
        <Form className="pb-5" onSubmit={handleRegister}>
          <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} 
                isInvalid={(errors['username'] || errors['non_field_errors']) ? true : false}/>
              {errors['username'] && (
                <Form.Control.Feedback type="invalid">{errors['username']}</Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" value={password1} onChange={handlePassword1Change} 
                isInvalid={(errors['password1'] || errors['non_field_errors']) ? true : false}/>
              {errors['password1'] && (
                <Form.Control.Feedback type="invalid">{errors['password1']}</Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formConfirmPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Re-enter Password" value={password2} onChange={handlePassword2Change} 
                isInvalid={(errors['password2'] || errors['non_field_errors']) ? true : false}/>
              {errors['password2'] && (
                <Form.Control.Feedback type="invalid">{errors['password2']}</Form.Control.Feedback>
              )}
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
    </>
  )
}
