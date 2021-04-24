import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'


export default function Projects() {
  const [project, setProject] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/project/${id}/`, {
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      setProject(data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{project.project_name}</title>
      </Helmet>
      <Navigation pageTitle={project.project_name}/>
      <Container>
        <section>
          <h1>{project.project_name}</h1>
          <p>{project.description}</p>
          <p>{project.visibility}</p>
          <p>{project.date_started}</p>
          <p>{project.ended}</p>
        </section>
      </Container>
    </>
  )
}
