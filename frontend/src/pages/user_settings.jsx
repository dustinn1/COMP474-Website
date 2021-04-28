import React from "react";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";

import Navigation from "../components/navigation";
import Button from "react-bootstrap/Button";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function UserSettings() {
  const handleLogout = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/dj-rest-auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      credentials: "include",
    })
      .then(() => {
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <Navigation pageTitle="User Settings" />
      <Container>
        <section>
          <Row>
            <Col md={2}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size="8x"
                style={{ color: "orange" }}
              />
            </Col>
            <Col md={10}>
              <Card>
                <Card.Header as="h5">NewUser</Card.Header>
                <Card.Body>
                  <Card.Title>Projects</Card.Title>
                  <Card.Text>SE Project</Card.Text>
                  <Button onClick={handleLogout} variant="info">
                    Logout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}
