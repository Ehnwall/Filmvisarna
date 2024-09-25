import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function NewPasswordMail() {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="p-5 custom-box-shadow bg-body-tertiary rounded-3">
              <h1 className="text-center ">Glömt lösenord</h1>
              <p className="text-center mb-5">
                Skriv in din mejl adress, så får du en länk på din mejl där du kan byta lösenord
              </p>
              <Form>
                <Form.Group controlId="formEmail mb-1">
                  <Form.Label className="mb-1">Nytt lösenord</Form.Label>
                  <Form.Control className="p-2" type="text" placeholder="Nytt lösenord" />
                </Form.Group>
                <Form.Group controlId="formEmail" className="my-4">
                  <Form.Label className="mb-1">Upprepa lösenord</Form.Label>
                  <Form.Control className="p-2" type="text" placeholder="Upprepa lösenord" />
                </Form.Group>
                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-primary">Logga in</Button>
                  <Button variant="primary">Uppdatera</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewPasswordMail
