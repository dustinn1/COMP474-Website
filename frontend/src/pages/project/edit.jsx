import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import Navigation from '../../components/navigation'

export default function EditProject() {
  // form states
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisbility] = useState('public');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState([Boolean]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);

  let { id } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/project/${id}/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => {
      const visibility = json.visibility === "public" ? "Public" : "Private";
      setProjectName(json.project_name);
      setDescription(json.description);
      setVisbility(visibility);
      setStartDate(json.date_started);
      setEndDate(json.date_ended);
      const currentTags = [];
      for (let i in json.tags) {
        currentTags.push(json.tags[i]['name']);
      }
      setTags(currentTags);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id])

  const handleProjectName = (event) => {
    setProjectName(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleVisibility = (event) => {
    setVisbility(event.target.value);
  }

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/project/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
      body: JSON.stringify({project_name: projectName, description: description, visibility: visibility.toLowerCase(), date_started: startDate, date_ended: endDate}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, project_name: (data.project_name) ? true : false}));
          setErrors(errors => ({...errors, description: (data.description) ? true : false}));
          setErrors(errors => ({...errors, date_started: (data.date_started) ? true : false}));
          setErrors(errors => ({...errors, date_ended: (data.date_ended) ? true : false}));
        })
      } else {
        let tagsAdd = [];
        for (let i in tags) {
          tagsAdd.push({"name": tags[i], "project_id": id})
        }
        fetch(`http://localhost:8000/api/tags/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken'),
          },
          credentials: "include",
        })
        .then(() => {
          fetch("http://localhost:8000/api/tags/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken'),
          },
          credentials: "include",
          body: JSON.stringify(tagsAdd),
        })
        setUpdated(true);
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/project/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
    })
    .then(() => {
      setDeleted(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getToday = (id) => {
    const today = dayjs().format('YYYY-MM-DD');
    document.getElementById(id).value = today;
    if (id === "formStartDate") {
      setStartDate(today);
    } else if (id === "formEndDate") {
      setEndDate(today);
    }
  }

  return (
    <>
      {updated && (
        <Redirect to={`/project/${id}`} />
      )}
      {deleted && (
        <Redirect to={'/'} />
      )}
      <Helmet>
        <title>Edit Project</title>
      </Helmet>
      <Navigation pageTitle="Edit Project"/>
      <Container>
        <section>
          <Form className="pb-5" noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formProjectName">
              <Form.Label column sm="2">
                Project Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" maxLength="50" placeholder="Project Name" value={projectName || ''} onChange={handleProjectName}
                  isInvalid={errors['project_name']}/>
                {errors['project_name'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Project Name.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" maxLength="255" placeholder="Description" value={description || ''} onChange={handleDescription}
                  isInvalid={errors['description']} />
                {errors['description'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Description.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formVisiblity">
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
            <Form.Group as={Row} controlId="formTags">
              <Form.Label column sm="2">
                Tags
              </Form.Label>
              <Col sm="10">
                <ReactTagInput 
                  tags={tags}
                  maxTags="8"
                  onChange={(newTags) => setTags(newTags)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formStartDate">
              <Form.Label column sm="2">
                Start Date
              </Form.Label>
              <Col sm="10">
                <Form.Control type="date" value={startDate || ''} onChange={handleStartDate}
                  isInvalid={errors['date_started']} />
                <span className="project-create-today" onClick={() => getToday("formStartDate")}>Today</span>
                {errors['date_started'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Date.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formEndDate">
              <Form.Label column sm="2">
                End Date
              </Form.Label>
              <Col sm="10">
                <Form.Control type="date" value={endDate || ''} onChange={handleEndDate}
                  isInvalid={errors['date_ended']} />
                <span className="project-create-today" onClick={() => getToday("formEndDate")}>Today</span>
                {errors['date_ended'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Date.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button variant="outline-primary" type="submit">
                Edit Project
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>Delete Project</Button>
          </div>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            size="md"
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title text-center">
                Delete Project?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this project?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </section>
      </Container>
    </>
  )
}
