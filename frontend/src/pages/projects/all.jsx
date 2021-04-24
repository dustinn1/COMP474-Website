import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import Navigation from '../../components/navigation'

import './styles.css';

export default function AllProjects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${props.userId}?format=json`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => setProjects(json))
    .catch((err) => {
      console.log(err);
    });
  }, [props.userId])

  return (
    <div>
      <Helmet>
        <title>All Projects</title>
      </Helmet>
      <Navigation pageTitle="All Projects"/>
      <Container>
        <section>
          <div className="d-flex flex-wrap justify-content-center">
            {projects.map((project) => {
              return (
                <LinkContainer to={`/project/${project.id}`} key={project.id}>
                  <Card className="project-card">
                    <Card.Header as="h5">
                      {project.project_name}
                      <small>{project.visibility}</small>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {project.description}<br /><br />
                        {/* project.tags.map((tag) => {
                          return (
                            <Badge variant="primary">{tag}</Badge>
                          )
                        })*/}<br /><br />
                        {project.date_started} to {project.date_ended}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              )
            })}
          </div>
        </section>
      </Container>
    </div>
  )
}
