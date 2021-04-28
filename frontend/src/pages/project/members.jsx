import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Navigation from '../../components/navigation'

export default function EditMembers(props) {
  // form states
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisbility] = useState('public');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [usersList, setUsersList] = useState([]);
  const [userCheckboxes, setUserCheckboxes] = useState({});

  const [updated, setUpdated] = useState(false);

  let { id } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:8000/api/project/${id}/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => {
      for (const i in json.users) {
        setUserCheckboxes(userCheckboxes => ({...userCheckboxes, [(json.users[i]['id'])]: true}))
      }
      setProjectName(json.project_name);
      setDescription(json.description);
      setVisbility(json.visibility);
      setStartDate(json.date_started);
      setEndDate(json.date_ended);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/`, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((res) => res.json())
    .then((json) => {
      setUsersList(json)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

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
    console.log(users)
    fetch(`http://localhost:8000/api/project/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
      body: JSON.stringify({project_name: projectName, description: description, visibility: visibility.toLowerCase(), date_started: startDate, date_ended: endDate, users: users}),
    })
    .then(() => setUpdated(true))
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
        <title>Edit Project</title>
      </Helmet>
      <Navigation pageTitle="Edit Project"/>
      <Container>
        <section>
          <Link to={`/project/${id}`}>
            Go Back
          </Link> <br /><br />
          <Form className="pb-5" noValidate onSubmit={handleSubmit}>
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
                Edit Project
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </>
  )
}
