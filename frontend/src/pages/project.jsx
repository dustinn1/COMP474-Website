import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'


export default function Projects() {
  let { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>Project {id}</title>
      </Helmet>
      <Navigation pageTitle={`Project ${id}`}/>
      <Container>
        <section>
          <h1>Project {id}</h1>
        </section>
      </Container>
    </div>
  )
}
