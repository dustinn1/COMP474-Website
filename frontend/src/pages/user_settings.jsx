import React from 'react'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'


export default function UserSettings() {

  return (
    <>
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <Navigation pageTitle="User Settings"/>
      <Container>
        <section>
        </section>
      </Container>
    </>
  )
}
