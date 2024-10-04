import React from 'react'
import { Row, Stack, Container, Col, Form } from 'react-bootstrap'

export default function CancelMovie() {
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={8} lg={6} xl={5}>
          <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3 ">
            <h2 className="text-center h1">Avboka film</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fyll i din Mejl</Form.Label>
                <Form.Control className="p-2" type="email" placeholder="Ange din e-postadress" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Bookingsnummer</Form.Label>
                <Form.Control className="p-2" type="password" placeholder="Bookingsnummer" />
              </Form.Group>
              <Stack direction="horizontal">
                <div>
                  <a className="btn btn-outline-primary" type="submit" href="/">
                    Avboka
                  </a>
                </div>
              </Stack>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
