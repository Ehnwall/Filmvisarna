import React from 'react'
import { Row, Stack, Container, Col, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  const notify = () => toast.success('Du är Medlem. Logga in!')
  return (
    <Container className="vh-100">
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={8} lg={6} xl={5}>
          <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3">
            <h2 className="text-center h1">Bli medlem</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fyll i din Mejl</Form.Label>
                <Form.Control type="email" placeholder="Ange din e-postadress" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control className="p-2" type="password" placeholder="Ange Lösenord" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Upprepa Lösenord</Form.Label>
                <Form.Control className="p-2" type="password" placeholder="Upprepa Lösenord" />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="outline-primary" onClick={notify}>
                    Bli medlem
                  </Button>
                  <ToastContainer />
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="link">Logga in</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
