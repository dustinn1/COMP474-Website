import React from 'react'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container'

import Navigation from '../components/navigation';

export default function Projects() {
  return (
    <div>
      <Helmet>
        <title>All Projects</title>
      </Helmet>
      <Navigation pageTitle="All Projects"/>
      <Container>
        
      </Container>
    </div>
  )
}
