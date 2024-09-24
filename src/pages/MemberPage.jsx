import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import {
  BsCalendar,
  BsClock,
  BsPin,
  BsReceipt,
  BsCreditCard2Back,
  BsPersonDown,
  BsArrowRightShort,
  BsPersonPlus,
} from 'react-icons/bs'

const MemberPage = () => {
  const booking = {
    title: 'Avengers',
    bookingNumber: '1234',
    date: '25/09',
    day: 'Måndag',
    year: '2023',
    time: '18:00',
    salong: 'Södra',
    seatNumbers: ['23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23', '23'],
  }
  const hej = {
    title: 'Avengers',
    bookingNumber: '1234',
    date: '25/09',
    day: 'Måndag',
    year: '2023',
    time: '18:00',
    salong: 'Södra',
    seatNumbers: ['23', '23', '23', '23', '23', '23'],
  }

  const bookings = [booking, hej, booking, booking, hej, booking, booking, hej]

  return (
    <>
      <Container className="py-5">
        <h1 className=" text-center pb-4">Medlemssida</h1>
        <Card className="pb-5">
          <Card.Header className="bg-primary">
            <h2 className="h4 mb-0 text-dark">Aktuella Bokningar</h2>
          </Card.Header>
          <Card.Body className="p-0">
            <Row className="">
              {bookings.map((booking, index) => (
                <Col key={index} sm={6} lg={4} xl={3} className="g-4">
                  <Card className="border">
                    <Card.Body>
                      <Card.Title>{booking.title}</Card.Title>
                      <Card.Text>
                        <Row>
                          <Col xs={7} className="d-flex align-items-center">
                            <ul className="list-unstyled m-0">
                              <li>
                                <BsReceipt size={18} className="text-primary me-2" />
                                <span>{booking.bookingNumber}</span>
                              </li>
                              <li>
                                <BsCalendar size={18} className="text-primary me-2" />
                                <span>{booking.date}</span>
                                <span>{booking.year}</span>
                              </li>
                              <li>
                                <BsClock size={18} className="text-primary me-2" />
                                <span>{booking.time}</span>
                              </li>
                              <li>
                                <BsPin size={18} className="text-primary me-2" />
                                <span>{booking.salong}</span>
                              </li>
                              <li>
                                <BsPersonPlus size={18} className="text-primary me-2" />
                                <span>21 biljetter</span>
                              </li>
                            </ul>
                          </Col>
                          <Col xs={5} className="d-flex flex-column align-items-end">
                            <img
                              className="img-fluid"
                              src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                              style={{ maxHeight: '140px' }}
                              alt="Booking Image"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <ul className="list-unstyled m-0">
                              <li>
                                <BsPersonDown size={18} className="text-primary me-2" />
                                Rad: 12 <BsArrowRightShort size={18} className="text-primary mx-1" />
                                <div className="d-flex flex-wrap gap-2 mt-1">
                                  {booking.seatNumbers.map((seat, index) => (
                                    <span key={index} className="badge bg-primary text-black">
                                      {seat}
                                    </span>
                                  ))}
                                </div>
                              </li>
                              <li className="mt-4">
                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                <span>Totalt: 240kr</span>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </Card.Text>
                      <div className="d-grid mt-5">
                        <Button variant="outline-danger" onClick={() => alert('Filmen är avbokad')}>
                          Avboka
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header className="bg-primary">
            <h2 className="h4 mb-0 text-dark">Bokningshistorik</h2>
          </Card.Header>
          <Card.Body className="p-0">
            <Row>
              {bookings.map((booking, index) => (
                <Col key={index} sm={6} lg={4} xl={3} className="g-4 ">
                  <Card className="border">
                    <Card.Body>
                      <Card.Title className="m-0">{booking.title}</Card.Title>
                      <Card.Text>
                        <Row>
                          <Col xs={7} className="d-flex align-items-center">
                            <ul className="list-unstyled m-0">
                              <li>
                                <BsReceipt size={18} className="text-primary me-2" />
                                <span>{booking.bookingNumber}</span>
                              </li>
                              <li>
                                <BsCalendar size={18} className="text-primary me-2" />
                                <span>{booking.date}</span>
                                <span>{booking.year}</span>
                              </li>
                              <li>
                                <BsClock size={18} className="text-primary me-2" />
                                <span>{booking.time}</span>
                              </li>
                              <li>
                                <BsPin size={18} className="text-primary me-2" />
                                <span>{booking.salong}</span>
                              </li>
                              <li>
                                <BsPersonPlus size={18} className="text-primary me-2" />
                                <span>21 biljetter</span>
                              </li>
                            </ul>
                          </Col>
                          <Col xs={5} className="d-flex flex-column align-items-end">
                            <img
                              className="img-fluid"
                              src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                              style={{ maxHeight: '140px' }}
                              alt="Booking Image"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <ul className="list-unstyled m-0">
                              <li>
                                <BsPersonDown size={18} className="text-primary me-2" />
                                Rad: 12 <BsArrowRightShort size={18} className="text-primary mx-1" />
                                <div className="d-flex flex-wrap gap-2 mt-1">
                                  {booking.seatNumbers.map((seat, index) => (
                                    <span key={index} className="badge bg-primary text-black">
                                      {seat}
                                    </span>
                                  ))}
                                </div>
                              </li>
                              <li className="mt-4">
                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                <span>Totalt: 240kr</span>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default MemberPage
