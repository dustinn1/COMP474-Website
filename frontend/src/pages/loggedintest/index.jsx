import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet';

export default function Account() {
  return (
    <div className="background">
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Container>
        <h1 className="text-center pt-4 pb-2">Login</h1>
        <Form className="pb-5">
          <Form.Group as={Row} controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" />
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
