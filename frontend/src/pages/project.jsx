import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import {Link, useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Navigation from '../components/navigation'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {Accordion, FormControl, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
    faExternalLinkAlt,
    faFileAlt,
    faFileWord,
    faSignOutAlt,
    faUser,
    faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkContainer} from "react-router-bootstrap";

export default function Project() {
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
       <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Project Manager</Navbar.Brand>
    <Nav className="mr-auto">
        <LinkContainer to="/pages/homepage">
      <Nav.Link href = "#home">Home</Nav.Link>
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
      <Navigation pageTitle={`Project ${project.id}: ${project.project_name}`}/>
<Container>
<Card>
  <Card.Header >Project Details</Card.Header>
  <Card.Body>
    <Card.Title>{project.project_name}</Card.Title>

      <ListGroup horizontal>
  <ListGroup.Item variant="primary">Project Name: {project.project_name}</ListGroup.Item>
  <ListGroup.Item variant="info">Description: {project.description}</ListGroup.Item>
  <ListGroup.Item variant="danger">Visibility: {project.visibility}</ListGroup.Item>
  <ListGroup.Item variant="warning">Start Date: {project.date_started}</ListGroup.Item>
  {/*<ListGroup.Item>{project.ended}</ListGroup.Item>*/}
   <ListGroup.Item>Members: {project.users}</ListGroup.Item>
</ListGroup>

    <section>
    <Link to="/edit" className="btn btn-primary">Edit Details</Link></section>
  </Card.Body>
</Card>
  </Container>
   <Container>
  <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        <FontAwesomeIcon icon={faFileAlt} />
        Documents
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <ListGroup.Item  variant="warning">
    <FontAwesomeIcon icon={faFileWord} />
    SE_Requirements_Doc

            <FontAwesomeIcon icon={ faExternalLinkAlt} />
  </ListGroup.Item>

  <ListGroup.Item variant="danger">
    <FontAwesomeIcon icon={faFileWord} />
    New_Doc5

      <FontAwesomeIcon icon={ faExternalLinkAlt} />
  </ListGroup.Item>

          <ListGroup.Item  variant="info">
    <FontAwesomeIcon  icon={faFileWord} />
    Design_Implementation_Doc
              <FontAwesomeIcon icon={faExternalLinkAlt} />
  </ListGroup.Item>
<p></p>
        <Button variant="success">Add Document</Button>
        <Button variant="danger">Remove Document</Button>
         <Button variant="info">Upload Document</Button>

      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        <FontAwesomeIcon icon={faUserCircle} />
        Members
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
  <ListGroup.Item  variant="info">
    <FontAwesomeIcon icon={faUser} />
    NewUser
  </ListGroup.Item>

  <ListGroup.Item variant="danger">
    <FontAwesomeIcon icon={faUser} />
    Ayat Diab</ListGroup.Item>
<p></p>
        <Button variant="success">Add Member</Button>
        <Button variant="danger">Remove Member</Button>



      </Card.Body>

    </Accordion.Collapse>
  </Card>
</Accordion>
     </Container>

      </>
  )

}

