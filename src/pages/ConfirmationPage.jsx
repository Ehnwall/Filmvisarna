import React from 'react'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'

const ConfirmationPage = () => {
  return (
    <Container className="mt-3 p-4 mb-5 bg-body-tertiary">
      <Card className="mb-6 text-center">
        <Card.Body>
          <Card.Title>Din bokning är nu klar</Card.Title>
          <Card.Text>Du får en bokningsbekäftelse på mailen med information om din bokning</Card.Text>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6} className="d-flex justify-content-center p-5">
          <div>
            <h5>Title: Avengers</h5>
            <ul className="list-unstyled ">
              <li>Datum och tid: 2024-09-23</li>
              <li>Plats: Sturegatan 21</li>
              <li>
                <h5>Stolsnummer: 34</h5>
              </li>
              <li className="pt-5">Total summa: 240kr</li>
              <li>
                <p>En orderbekräftelse kommer på mailen</p>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center pt-4 ">
          <Image
            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
            alt="Confirmed movie picture"
            className="img-fluid w-100 w-md-25 p-3"
            style={{ maxWidth: '300px', height: 'auto' }}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-around">
          <Button variant="primary" className="mx-2 g-1">
            Avbryt bokning
          </Button>
          <Button variant="primary" className="mx-2 ">
            Bekräfta
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ConfirmationPage
