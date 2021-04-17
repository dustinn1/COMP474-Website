import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

export default function RegisterModal(props) {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  }

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  }

  const handleRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({username: username, password1: password1, password2: password2}),
    })
    .then((res) => {
      if (!res.ok) {
        res.json()
        .then((data) => {
          setErrors(errors => ({...errors, non_field_errors: (data.non_field_errors) ? data.non_field_errors[0] : ''}));
          setErrors(errors => ({...errors, username: (data.username) ? data.username[0] : ''}));
          setErrors(errors => ({...errors, password1: (data.password1) ? data.password1[0] : ''}));
          setErrors(errors => ({...errors, password2: (data.password2) ? data.password2[0] : ''}));
        })
      } else {
        window.location.reload(false);
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
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="form-non-field-invalid">
          {errors['non_field_errors'] ? errors['non_field_errors'] : ''}
        </p>
        <Form className="pb-5" onSubmit={handleRegister}>
          <Form.Group controlId="formUsername">
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} 
              isInvalid={(errors['username'] || errors['non_field_errors']) ? true : false}/>
            {errors['username'] && (
              <Form.Control.Feedback type="invalid">{errors['username']}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" value={password1} onChange={handlePassword1Change} 
              isInvalid={(errors['password1'] || errors['non_field_errors']) ? true : false}/>
            {errors['password1'] && (
              <Form.Control.Feedback type="invalid">{errors['password1']}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" placeholder="Re-enter Password" value={password2} onChange={handlePassword2Change} 
              isInvalid={(errors['password2'] || errors['non_field_errors']) ? true : false}/>
            {errors['password2'] && (
              <Form.Control.Feedback type="invalid">{errors['password2']}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="outline-primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        Have an account already?
        <p className="account-modal-switch" onClick={props.changeModal}>Login</p>
      </Modal.Footer>
    </Modal>
  )
}