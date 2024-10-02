import React from 'react'
import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin, BsCreditCard2Back } from 'react-icons/bs'

export default function BookingPage() {
  const rowSizes = [8, 9, 10, 10, 10, 10, 12, 13]
  const seatArray = rowSizes.map(
    (size) => new Array(size).fill(null).map(() => ({ booked: Math.random() < 0.3 })) // Randomly mark some seats as booked
  )
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col xs={12} md={9}>
            <Row className="gy-4">
              <Col xs={12}>
                <Card>
                  <Card.Header className="bg-primary ">
                    <h1 className="mb-0 text-dark ">Marvels Avengers</h1>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex align-items-center py-1">
                      <BsCalendar size={18} className="text-primary me-2" />
                      <span className="me-2">Tisdag 25/10</span>
                    </div>
                    <div className="d-flex align-items-center py-1">
                      <BsClock size={18} className="text-primary me-2" />
                      <span className="me-2">18:00 </span>
                    </div>
                    <div className="d-flex align-items-center py-1">
                      <BsClock size={18} className="text-primary me-2" />
                      <span>2 tim 2 min</span>
                    </div>
                    <div className="d-flex align-items-center py-1">
                      <BsPin size={18} className="text-primary me-2" />
                      <span className="me-2">Stockholm, Sergels torg</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12}>
                <Card>
                  <Card.Header className="bg-primary ">
                    <h3 className="mb-0 text-dark">Antal Biljetter</h3>
                  </Card.Header>
                  <Card.Body xs={4}>
                    <Row className="g-0">
                      <Col xs={12} lg={8} className="d-flex justify-content-left mb-3">
                        <div className="fw-bold" style={{ minWidth: '100px' }}>
                          Barn
                        </div>
                        <div className="text-center">60 kr</div>
                        <ButtonGroup className="btn-group-sm ms-5">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary pb-2" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={12} lg={8} className="d-flex justify-content-left mb-3">
                        <div className="fw-bold" style={{ minWidth: '100px' }}>
                          Pensionär
                        </div>
                        <div className="text-center ">80 kr</div>
                        <ButtonGroup className="btn-group-sm ms-5">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={12} lg={8} className="d-flex justify-content-left mb-3">
                        <div className="fw-bold" style={{ minWidth: '83px' }}>
                          Vuxen
                        </div>
                        <div className="text-center ms-2">120 kr</div>
                        <ButtonGroup className="btn-group-sm ms-5">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <div className="fw-bold" style={{ minWidth: '83px' }}>
                        <BsCreditCard2Back size={18} className="text-primary me-2" />
                        Total: 120 kr
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={3}>
            <Card className="mt-4 mt-md-0" style={{ width: '100%' }}>
              <Image className="rounded" src="https://img.fruugo.com/product/7/41/14532417_max.jpg" />
            </Card>
          </Col>
        </Row>
        <div className="seat-picker rounded-3 overflow-auto my-5">
          <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50 "></div>
            {seatArray.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat, seatIndex) => (
                  <Form.Check key={seatIndex} type="checkbox" disabled={seat.booked} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Row className="gy-4">
          <Card>
            <Card.Header className="bg-primary rounded">
              <h3 className="mb-0 text-dark text-center">Ange dina uppgifter</h3>
            </Card.Header>
          </Card>
          <div className="d-flex flex-column align-items-center">
            {[
              { label: 'Namn', type: 'text' },
              { label: 'E-post', type: 'email' },
              { label: 'Telefon', type: 'tel' },
            ].map(({ label, type }) => (
              <Col md={4} key={label}>
                <Form.Group className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <Form.Control type={type} placeholder={`Ange ditt ${label.toLowerCase()}`} />
                </Form.Group>
              </Col>
            ))}
          </div>
          <Col className="d-flex justify-content-center">
            <a className="btn btn-outline-primary" href="/confirmation-page">
              Boka Platser
            </a>
          </Col>
        </Row>
      </Container>
    </>
  )
}
