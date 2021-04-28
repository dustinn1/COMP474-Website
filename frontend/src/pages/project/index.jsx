import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faFileAlt, faUserCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navigation from "../../components/navigation";

export default function Project() {
  const [project, setProject] = useState([]);
  const [usersLength, setUsersLength] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/project/${id}/`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setUsersLength(data.users.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, usersLength]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Project Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/pages/homepage">
            <Nav.Link href="#home">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/projects/all">
            <Nav.Link href="#projects">Projects</Nav.Link>
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
        <title>{project.project_name}</title>
      </Helmet>
      <Navigation
        pageTitle={`Project ${project.id}: ${project.project_name}`}
      />
      <Container>
        <section>
          <Card className="mt-3">
            <Tab.Container defaultActiveKey="details">
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="details">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="documents">
                      <FontAwesomeIcon icon={faFileAlt} />
                      Documents
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="members">
                      <FontAwesomeIcon icon={faUserCircle} />
                      Members <Badge variant="secondary">{usersLength}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <Row>
                      <Col md={10}>
                        <h3>Project Details</h3>
                      </Col>
                      <Col md={2}>
                        <LinkContainer to={`/project/${id}/edit/details`}>
                          <Button variant="outline-primary" block>Edit Details</Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                    <hr />
                    <p>Project Name: {project.project_name}</p>
                    <p>Description:{project.description}</p>
                    <p style={{textTransform: 'capitalize'}}>Visiblity: {project.visibility}</p>
                    <p>{project.date_started} - {project.date_ended}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="documents">
                    <Row>
                      <Col md={10}>
                        <h3>Documents</h3>
                      </Col>
                      <Col md={2}>
                        <Button variant="outline-primary" block>Edit Documents</Button>
                      </Col>
                    </Row>
                    <hr />
                  </Tab.Pane>
                  <Tab.Pane eventKey="members">
                    <Row>
                      <Col md={10}>
                        <h3>Members</h3>
                      </Col>
                      <Col md={2}>
                        <LinkContainer to={`/project/${id}/edit/members`}>
                          <Button variant="outline-primary" block>Edit Members</Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                    <hr />
                    <ListGroup variant="flush">
                      {usersLength > 0 && (
                        project.users.map((user) => {
                          return (
                            <ListGroup.Item key={user.id}>
                              {user.username}
                            </ListGroup.Item>
                          )
                        }))}
                    </ListGroup>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Tab.Container>
          </Card>
        </section>
      </Container>
    </>
  );
}
