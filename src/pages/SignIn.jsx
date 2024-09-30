import React from 'react'
import { Row, Stack, Container, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'

export default function SignIn() {
  return (
    <>
      <Container className="vh-100">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3 ">
              <h2 className="text-center h1">Logga in</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fyll i din Mejl</Form.Label>
                  <Form.Control className="p-2" type="email" placeholder="Ange din e-postadress" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control className="p-2" type="password" placeholder="Ange lösenord" />
                </Form.Group>
                <Stack direction="horizontal">
                  <div>
                    <a className="btn btn-outline-primary" type="submit" href="/member">
                      Logga in
                    </a>
                  </div>
                  <div className="d-flex justify-content-end ms-auto">
                    <a className="btn btn-link p-0" href="/forgot-password">
                      Glömt Lösenord?
                    </a>
                  </div>
                </Stack>
                <Row className="mt-3">
                  <Col>
                    <a className="btn btn-link p-0" href="/register">
                      Ny här? Bli medlem
                    </a>
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
