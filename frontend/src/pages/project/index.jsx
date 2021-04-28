import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faFileAlt, faUserCircle, faInfoCircle, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navigation from "../../components/navigation";

export default function Project() {
  const [project, setProject] = useState([]);
  const [usersLength, setUsersLength] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [documentsLength, setDocumentsLength] = useState(0);
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

  useEffect(() => {
    fetch(`http://localhost:8000/api/documents/${id}/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((data) => {
      setDocuments(data);
      setDocumentsLength(data.length);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id])

  return (
    <>
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
                      Documents <Badge variant="secondary">{documentsLength}</Badge>
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
                    <p>Description: {project.description}</p>
                    Tags: {project.tags && project.tags.map((tag) => {
                      return (
                        <Badge variant="primary" key={tag.id} className="mr-1">{tag.name}</Badge>
                      )
                    })} <br /><br />
                    <p style={{textTransform: 'capitalize'}}>Visiblity: {project.visibility}</p>
                    <p>{dayjs(project.date_started).format('MMM DD, YYYY')} to {dayjs(project.date_ended).format('MMM DD, YYYY')}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="documents">
                    <Row>
                      <Col md={10}>
                        <h3>Documents</h3>
                      </Col>
                      <Col md={2}>
                        <LinkContainer to={`/project/${id}/edit/documents`}>
                          <Button variant="outline-primary" block>Edit Documents</Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                    <hr />
                    <ListGroup variant="flush">
                      {documentsLength > 0 && (
                        documents.map((document) => {
                          let file_path = document.file.split('/')[3];
                          return (
                            <ListGroup.Item key={document.id}>
                              <a href={`/documents/${file_path}`} target="_blank" rel="noreferrer">
                                <strong>{document.title}</strong>  <FontAwesomeIcon icon={faExternalLinkAlt} /> 
                              </a> <br />
                              Description: {document.description} <br />
                              Added by: {document.added_by.username} <br />
                              Added on: {document.date_added}
                            </ListGroup.Item>
                          )
                        }))}
                    </ListGroup>
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
