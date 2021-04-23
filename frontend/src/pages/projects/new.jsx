import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Navigation from '../../components/navigation'


export default function NewProject() {
  const [projectName, setProjectName] = useState('');
  const [visibility, setVisbiltiy] = useState('public');
  const [tags, setTags] = useState([]);

  const handleProjectName = (event) => {
    setProjectName(event.target.value);
  }

  const handleVisibility = (event) => {
    setVisbiltiy(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${projectName}, ${visibility}`);
  }

  return (
    <>
      <Helmet>
        <title>New Project</title>
      </Helmet>
      <Navigation pageTitle="New Project"/>
      <Container>
        <section>
          <Form className="pb-5" noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formProjectName">
              <Form.Label column sm="2">
                Project Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Project Name" value={projectName} onChange={handleProjectName}
                  isInvalid="" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formProjectName">
              <Form.Label column sm="2">
                Visiblity
              </Form.Label>
              <Col sm="10">
                <Form.Control as="select" custom value={visibility} onChange={handleVisibility}>
                  <option>Public</option>
                  <option>Private</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button variant="outline-primary" type="submit">
                Log in
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </>
  )
}
