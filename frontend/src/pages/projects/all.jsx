import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import './styles.css';

import Navigation from '../../components/navigation'

export default function AllProjects(props) {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${props.userId}`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => {
      setProjects(json);
      setLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [props.userId])

  return (
    <>
      <Helmet>
        <title>All Projects</title>
      </Helmet>
      <Navigation pageTitle="All Projects"/>
      <Container>
        <section>
          <div className="d-flex flex-column pb-2">
            <LinkContainer to="/projects/new">
              <Button variant="outline-success" className="align-self-end">New Project</Button>
            </LinkContainer>
          </div>
          <div className="d-flex flex-wrap justify-content-center flex-grow-0">
            {!loaded && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            {loaded && 
              projects.map((project) => {
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
                          {dayjs(project.date_started).format('MMM DD, YYYY')} to {dayjs(project.date_ended).format('MMM DD, YYYY')} <br /><br />
                          {project.tags.map((tag) => {
                            return (
                              <Badge variant="primary" key={tag.id}>{tag.name}</Badge>
                            )
                          })}
                        </Card.Text>
                      </Card.Body>
                    </Card>

                  </LinkContainer>
                )
            })}
          </div>
        </section>
      </Container>
    </>
  )
}
