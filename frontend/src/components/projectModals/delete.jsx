import React from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteModal(props) {
  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/document/${props.deleteId}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken'),
      },
      credentials: "include",
    })
    .then(() => props.onDelete())
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title text-center">
          Delete "{props.deleteTitle}"?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this document?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}