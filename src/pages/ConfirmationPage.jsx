import React from 'react'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import {
  BsCalendar,
  BsCreditCard2Back,
  BsGeoAlt,
  BsPersonDown,
  BsCameraReels,
  BsArrowRightShort,
  BsPersonPlus,
} from 'react-icons/bs'

const ConfirmationPage = () => {
  return (
    <Container className="mt-1 p-3 mb-1 bg-body-tertiary">
      <Card className="mb-6 text-center  bg-opacity-25">
        <Card.Body>
          <Card.Title>
            <h1>Din bokning är nu klar</h1>
          </Card.Title>
          <Card.Text>Du får en bokningsbekräftelse på mailen med information om din bokning på order: 1234</Card.Text>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6} className="d-flex justify-content-center p-5">
          <div className="mt-5 text-center">
            <h2 className="mt-4 d-flex align-items-center justify-content-left">
              <BsCameraReels size={18} className="text-primary me-2" />
              Avengers
            </h2>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center justify-content-left my-1">
                <BsCalendar size={18} className="text-primary me-2" />
                25/09 Tisdag
              </li>
              <li className="d-flex align-items-center justify-content-left my-1">
                <BsGeoAlt size={18} className="text-primary me-2" />
                Sturegatan 31
              </li>
              <li className="d-flex align-items-center justify-content-left my-1">
                <BsPersonPlus size={18} className="text-primary me-2" />1 barnbiljet och 1 vuxen
              </li>
              <li className="d-flex align-items-center justify-content-left my-1">
                <h6 className="d-flex align-items-center">
                  <BsPersonDown size={18} className="text-primary me-2" />
                  Rad: 12 <BsArrowRightShort size={18} className="text-primary mx-1" /> Plats: 32,33
                </h6>
              </li>
              <li className="pt-5 d-flex align-items-center justify-content-left">
                <h6 className="d-flex align-items-center">
                  <BsCreditCard2Back size={18} className="text-primary me-2" />
                  Totalt: 240kr
                </h6>
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
        <Col className="d-flex justify-content-center">
          <Button variant="outline-primary" className="mx-2">
            Bekräfta
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ConfirmationPage
