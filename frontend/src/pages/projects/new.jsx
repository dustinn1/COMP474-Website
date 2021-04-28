import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import Navigation from '../../components/navigation'

export default function NewProject(props) {
  // form states
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisbility] = useState('public');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState([Boolean])
  const [createdProjectID, setCreatedProjectID] = useState(0);

  const [usersList, setUsersList] = useState([]);
  const [userCheckboxes, setUserCheckboxes] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => setUsersList(json))
    .catch((err) => {
      console.log(err);
    });
    setUserCheckboxes({[props.userId]: true})
  }, [props.userId])

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

  const handleCheckbox = (event) => {
    setUserCheckboxes(userCheckboxes => ({...userCheckboxes, [event.target.id]: (event.target.checked ? true : false ) }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let users = [];
    for (let i in userCheckboxes) {
      if (userCheckboxes[i]) {
        users.push(parseInt(i));
      }
    }
    fetch("http://localhost:8000/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
      body: JSON.stringify({project_name: projectName, description: description, visibility: visibility.toLowerCase(), date_started: startDate, date_ended: endDate, users: users, managers: []}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, project_name: (data.project_name) ? true : false}));
          setErrors(errors => ({...errors, description: (data.description) ? true : false}));
          setErrors(errors => ({...errors, date_started: (data.date_started) ? true : false}));
          setErrors(errors => ({...errors, date_ended: (data.date_ended) ? true : false}));
          users = [];
        })
      } else {
        res.json()
        .then((data) => {
          let tagsAdd = [];
          for (let i in tags) {
            tagsAdd.push({"name": tags[i], "project_id": data.id})
          }
          fetch("http://localhost:8000/api/tags/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get('csrftoken'),
            },
            credentials: "include",
            body: JSON.stringify(tagsAdd),
          })
          setCreatedProjectID(data.id);
        })
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
      {createdProjectID !== 0 && (
        <Redirect to={`/project/${createdProjectID}`} />
      )}
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
                <Form.Control type="text" maxLength="50" placeholder="Project Name" value={projectName} onChange={handleProjectName}
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
                <Form.Control as="textarea" maxLength="255" placeholder="Description" value={description} onChange={handleDescription}
                  isInvalid={errors['description']} />
                {errors['description'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Description.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formVisibility">
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
                <Form.Control type="date" value={startDate} onChange={handleStartDate}
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
                <Form.Control type="date" value={endDate} onChange={handleEndDate}
                  isInvalid={errors['date_ended']} />
                <span className="project-create-today" onClick={() => getToday("formEndDate")}>Today</span>
                {errors['date_ended'] && (
                  <Form.Control.Feedback type="invalid">Please enter a Date.</Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <div className="project-user-list mb-4">
              <div className="project-user-list-header">
                <Row>
                  <Col xs={8}>Username</Col>
                  <Col xs={4}>Can View</Col>
                </Row>
              </div>
              {usersList.map((user) => {
                return (
                  <div className="project-user-list-user" key={user.id}>
                    <Row>
                      <Col xs={8}>
                        {user.username} {(user.id === props.userId) ? "(you)" : ''}</Col>
                      <Col xs={4}>
                        <Form.Check 
                          custom
                          type="checkbox"
                          id={user.id}
                          disabled={(user.id === props.userId)}
                          checked={(user.id === props.userId) || userCheckboxes[user.id] || false}
                          onChange={handleCheckbox}
                        />
                      </Col>
                    </Row>
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <Button variant="outline-primary" type="submit">
                Create Project
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </>
  )
}
