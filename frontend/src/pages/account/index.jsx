import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Helmet } from 'react-helmet';

export default function Account() {
  return (
    <div className="background">
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Container>
        <h1 className="center">Login</h1>
        <Form>
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
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </Container>
    </div>
  )
}
