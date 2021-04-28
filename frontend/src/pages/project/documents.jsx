import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faPencilAlt, faTrashAlt, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bsCustomFileInput from 'bs-custom-file-input';

import Navigation from '../../components/navigation'

export default function EditDocuments(props) {
  const [file, setFile] = useState();
  const [documentTitle, setDocumentTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [updated, setUpdated] = useState(false);

  const [documents, setDocuments] = useState([]);

  let { id } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/documents/${id}/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => {
      bsCustomFileInput.init();
      setDocuments(json);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id])

  const handleDocumentTitle = (event) => {
    setDocumentTitle(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
		formData.append('file', file);
		formData.append('project_id', id);
		formData.append('title', documentTitle);
		formData.append('description', description);
		formData.append('added_by', props.userId);
    fetch(`http://localhost:8000/api/upload_documents/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
      body: formData,
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, title: (data.title) ? data.title[0] : ''}));
          setErrors(errors => ({...errors, description: (data.description) ? data.description[0] : ''}));
          setErrors(errors => ({...errors, file: (data.file) ? "Please upload a valid file." : ''}));
        })
      } else {
        setUpdated(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      {updated && (
        <Redirect to={`/project/${id}`} />
      )}
      <Helmet>
        <title>Edit Documents</title>
      </Helmet>
      <Navigation pageTitle="Edit Documents"/>
      <Container>
        <section>
          <h3>All Documents</h3>
          <ListGroup variant="flush">
            <ListGroup.Item style={{borderBottom: '1.5px solid #000'}}>
              <Row className="text-center">
                <Col md={8}><strong>Document Info</strong></Col>
                <Col md={4}><strong>Actions</strong></Col>
              </Row>
            </ListGroup.Item>
            {(
              documents.map((document) => {
                let file_path = document.file.split('/')[3];
                return (
                  <ListGroup.Item key={document.id}>
                    <Row>
                      <Col md={8}>
                        <a href={`/documents/${file_path}`} target="_blank" rel="noreferrer">
                          <strong>{document.title}</strong>  <FontAwesomeIcon icon={faExternalLinkAlt} /> 
                        </a> <br />
                        Description: {document.description} <br />
                        Added by: {document.added_by.username} <br />
                        Added on: {document.date_added}
                      </Col>
                      <Col md={2}>
                        <Button variant="success" id={`${document.id}-edit`}>
                          <FontAwesomeIcon icon={faPencilAlt} />
                          Edit
                        </Button>
                      </Col>
                      <Col md={2}>
                        <Button variant="danger" id={`${document.id}-delete`}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              }))}
          </ListGroup>
          <Form className="mt-5" noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formTitle">
              <Form.Label column sm="2">
                Document Title
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" maxLength="50" placeholder="Document Title" value={documentTitle} onChange={handleDocumentTitle}
                  isInvalid={errors['title']}/>
                {errors['title'] && (
                  <Form.Control.Feedback type="invalid">{errors['title']}</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" maxLength="255" placeholder="Description" value={description} onChange={handleDescription}
                  isInvalid={errors['description']}/>
                {errors['description'] && (
                  <Form.Control.Feedback type="invalid">{errors['description']}</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDocument">
              <Form.Label column sm="2">
                Document
              </Form.Label>
              <Col sm="10">
                <Form.File 
                  id="upload-file"
                  label="Upload"
                  onChange={handleFile}
                  custom
                  isInvalid={errors['file']}
                />
                {errors['file'] && (
                  <Form.Control.Feedback type="invalid">{errors['file']}</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button variant="outline-primary" type="submit">
                Upload Document
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </>
  )
}
