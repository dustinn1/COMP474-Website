import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Navigation from '../../components/navigation'

import './styles.css';
import {FormControl, ProgressBar} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

export default function AllProjects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${props.userId}`, {
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
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Project Manager</Navbar.Brand>
    <Nav className="mr-auto">
        <LinkContainer to="/homepage">
      <Nav.Link href = "">Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/projects">
      <Nav.Link href="">Projects</Nav.Link>
        </LinkContainer>
        <LinkContainer to="">
          <Nav.Link href="#chat">Chat</Nav.Link>
        </LinkContainer>

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
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
          <div className="d-flex flex-wrap justify-content-center">
            {projects
              .map((project) => {
                return (
                  <LinkContainer to={`/project/${project.id}`} key={project.id}>
                    <Card className="project-card">
                      <ProgressBar>
                    <ProgressBar striped variant="success" now={35} key={1} />
                    <ProgressBar variant="warning" now={20} key={2} />
                    <ProgressBar striped variant="danger" now={10} key={3} />
                    </ProgressBar>
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
