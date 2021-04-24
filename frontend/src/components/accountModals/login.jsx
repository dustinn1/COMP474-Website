import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

export default function LoginModal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({username: username, password: password}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, non_field_errors: (data.non_field_errors) ? data.non_field_errors[0] : ''}));
          setErrors(errors => ({...errors, password: (data.password) ? data.password[0] : ''}));
        })
      } else {
        window.location.reload();
      }
    })  
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="form-non-field-invalid">
          {errors['non_field_errors'] ? errors['non_field_errors'] : ''}
        </p>
        <Form className="pb-5" noValidate onSubmit={handleLogin}>
          <Form.Group controlId="formUsername">
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange}
              isInvalid={errors['non_field_errors'] ? true : false} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}
              isInvalid={(errors['password'] || errors['non_field_errors']) ? true : false} />
            {errors['password'] && (
              <Form.Control.Feedback type="invalid">{errors['password']}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-primary" type="submit">
              Log in
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        Don't have an account? 
        <p className="account-modal-switch" onClick={props.changeModal}>Sign Up</p>
      </Modal.Footer>
    </Modal>
  )
}