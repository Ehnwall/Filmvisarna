import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function ForgotPasswordMail() {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh' }}>
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="p-5 custom-box-shadow bg-body-tertiary rounded-3">
              <h1 className="text-center ">Glömt lösenord</h1>
              <p className="text-center mb-5">
                Skriv in din mejl adress, så får du en länk på din mejl där du kan byta lösenord
              </p>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Fyll i din Mejl</Form.Label>
                  <Form.Control className="p-2" type="email" placeholder="Ange din e-postadress" />
                </Form.Group>
                <div className="d-flex justify-content-between mt-4">
                  <Button variant="primary">Tillbaka</Button>
                  <Button variant="outline-primary">Skicka</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ForgotPasswordMail
