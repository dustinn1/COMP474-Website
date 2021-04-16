import React from 'react'
import Container from 'react-bootstrap/Container'

import { Helmet } from 'react-helmet';

export default function Projects() {
  return (
    <div>
      <Helmet>
        <title>All Projects</title>
      </Helmet>
      <Container>
        <h1 className="text-center pt-4 pb-2">projects</h1>
      </Container>
    </div>
  )
}
