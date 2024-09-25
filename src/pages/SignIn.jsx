import React from 'react'
import { Row, Stack, Container, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'

export default function SignIn() {
  return (
    <>
      <Container className="vh-100">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="p-4 bg-body-tertiary custom-box-shadow rounded-3">
              <h2 className="text-center">Logga in</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fyll i din Mejl</Form.Label>
                  <Form.Control type="email" placeholder="Ange din e-postadress" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control type="password" placeholder="Ange lösenord" />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="outline-primary" type="submit">
                      Logga in
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Form.Text className="link-form">Glömt Lösenord?</Form.Text>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Text className="link-form ">Ny här? Bli medlem</Form.Text>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}