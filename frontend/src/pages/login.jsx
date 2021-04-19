import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container>
        <h1 className="text-center">You must login to view that page</h1>
      </Container>
    </>
  )
}
