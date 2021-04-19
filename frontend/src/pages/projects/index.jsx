import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import Navigation from '../../components/navigation'

import './styles.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const getJSON = () => {
    fetch("/projects.json", {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => setProjects(json))
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getJSON();
  }, [])

  return (
    <div>
      <Helmet>
        <title>All Projects</title>
      </Helmet>
      <Navigation pageTitle="All Projects"/>
      <Container>
        <section>
          <div className="d-flex">
            {projects.map((project) => {
              return (
                <LinkContainer to={`/project/${project.projectID}`}>
                  <Card className="project-card">
                    <Card.Header as="h5">
                      {project.name}
                      <small>{project.visibility}</small>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {project.description}<br /><br />
                        {project.tags.map((tag) => {
                          return (
                            <Badge variant="primary">{tag}</Badge>
                          )
                        })}<br /><br />
                        {project.dateStart} to {project.dateEnded}
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
