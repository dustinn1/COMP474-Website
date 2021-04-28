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

import Navigation from '../../components/navigation'

export default function EditProject() {
  // form states
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisbility] = useState('public');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState([Boolean]);

  const [updated, setUpdated] = useState(false);

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
        setUpdated(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
        </section>
      </Container>
    </>
  )
}
