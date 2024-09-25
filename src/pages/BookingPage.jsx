import React from 'react'
import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'

export default function BookingPage() {
  const rowSizes = [8, 9, 10, 10, 10, 10, 12, 13]
  const seatArray = rowSizes.map((size) => new Array(size).fill(null))
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col xs={9}>
            <Row className="gy-4">
              <Col xs={12}>
                <Card>
                  <Card.Header className="bg-primary">
                    <h1 className="mb-0 text-dark">Marvels Avengers</h1>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <BsCalendar size={18} className="text-primary me-2" />
                      <span className="me-2">Tisdag 10/15</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <BsClock size={18} className="text-primary me-2" />
                      <span className="me-2">18:00</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <BsPin size={18} className="text-primary me-2" />
                      <span className="me-2">Stockholm, Sergels torg</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12}>
                <Card>
                  <Card.Header className="bg-primary">
                    <h3 className="mb-0 text-dark">Antal Biljetter</h3>
                  </Card.Header>
                  <Card.Body>
                    <Row className=" g-0  align-items-center">
                      <Col xs={1}>
                        <p className="fw-bold">Barn</p>
                      </Col>
                      <Col xs={2}>
                        <p>60 kr</p>
                      </Col>
                      <Col xs={9}>
                        <ButtonGroup className="btn-group-sm">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={1}>
                        <p className="fw-bold">Pensionär</p>
                      </Col>
                      <Col xs={2}>
                        <p>80 kr</p>
                      </Col>
                      <Col xs={9}>
                        <ButtonGroup className="btn-group-sm">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={1}>
                        <p className="fw-bold">Vuxen</p>
                      </Col>
                      <Col xs={2}>
                        <p>120 kr</p>
                      </Col>
                      <Col xs={9}>
                        <ButtonGroup className="btn-group-sm">
                          <Button variant="outline-primary px-3">-</Button>
                          <Button className="bg-body-tertiary" variant="outline-primary px-3">
                            0
                          </Button>
                          <Button variant="outline-primary px-3">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xs={3} className="mt-5">
                        <h3>Totalt:</h3>
                      </Col>
                      <Col xs={1}>
                        <p className="text-center mt-5">1200 kr</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card className="" style={{ width: '18rem' }}>
              <Image className="rounded" src="https://img.fruugo.com/product/7/41/14532417_max.jpg" />
            </Card>
          </Col>
        </Row>
        <div className="seat-picker p-5 rounded-3 overflow-auto py-5">
          <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50 "></div>
            {seatArray.map((row, rowIndex) => (
              <div key={rowIndex} className="seats py-1">
                {row.map((_, colIndex) => (
                  <Form.Check key={colIndex} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Row className="gy-4">
          <Col xs={12} className="d-flex justify-content-center mb-3">
            <h2>Ange dina uppgifter</h2>
          </Col>
          <div xs={12}>
            <Col xs={12} md={3} className="mb-3">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label for="floatingInput">Namn</label>
              </div>
            </Col>
            <Col xs={12} md={3} className="mb-3">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label for="floatingInput">Email</label>
              </div>
            </Col>
            <Col xs={12} md={3} className="mb-3">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label for="floatingInput">Telefon</label>
              </div>
            </Col>
          </div>
          <Col className="d-flex justify-content-center">
            <Button variant="outline-primary">Boka Platser</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}
