import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    BsCalendar,
    BsClock,
    BsPin,
    BsReceipt,
    BsCreditCard2Back,
    BsPersonCircle,
    BsArrowRightShort,
    BsBuildingDown,
} from 'react-icons/bs'
import { useGetBookings } from '../../utils/api/booking/useGetBookings'

const MemberPage = () => {
    const { data: bookings } = useGetBookings()
    const notify = () => toast.success('Filmen är nu avbokad!')
    interface Booking {
        id: string
        title: string
        bookingNumber: string
        date: string
        time: string
        day: string
        salong: string
        tickets: number
        seatNumbers: string[]
        row: string
        imageUrl: string
    }

    const splitBookings = (bookings: Booking[]) => {
        const currentDate = new Date()

        const currentBookings = bookings.filter((booking) => new Date(booking.date) >= currentDate)

        const pastBookings = bookings.filter((booking) => new Date(booking.date) < currentDate)

        return { currentBookings, pastBookings }
    }

    const { currentBookings, pastBookings } = splitBookings(bookings)
    console.log('hej')
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
                {currentBookings.length === 0 ? (
                  <p className="text-center">Inga aktuella bokningar.</p>
                ) : (
                            {currentBookings.map((booking, index) => (
                                <Col key={index} sm={6} lg={4} xl={3} className="g-4">
                                    <Card className="border h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{booking.title}</Card.Title>
                                            <Card.Text className="flex-grow-1">
                                                <Row>
                                                    <Col xs={7} className="d-flex align-items-center">
                                                        <ul className="list-unstyled m-0">
                                                            <li>
                                                                <BsReceipt size={18} className="text-primary me-2" />
                                                                <span>{booking.bookingNumber}</span>
                                                            </li>
                                                            <li>
                                                                <BsCalendar size={18} className="text-primary me-2" />
                                                                <span>{booking.day} </span>
                                                                <span>{booking.date}</span>
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
                                                                <BsPersonCircle
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                <span>21 biljetter</span>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xs={5} className="d-flex flex-column align-items-end">
                                                        <img
                                                            className="img-fluid"
                                                            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                                                            alt="Booking Image"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <ul className="list-unstyled m-0">
                                                            <li>
                                                                <BsBuildingDown
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                Rad: 12{' '}
                                                                <BsArrowRightShort
                                                                    size={18}
                                                                    className="text-primary mx-1"
                                                                />
                                                                <div className="d-flex flex-wrap gap-2 mt-1">
                                                                    {booking.seatNumbers.map((seat, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="badge bg-primary text-black"
                                                                        >
                                                                            {seat}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            <div>
                                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                                <span>Totalt: 240 kr</span>
                                            </div>
                                            <div className="d-grid mt-4">
                                                <Button className="mt-auto" variant="outline-danger" onClick={notify}>
                                                    Avboka
                                                </Button>
                                                <ToastContainer />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                  }
                    )}
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
                                    <Card className="border h-100">
                                        <Card.Body>
                                            <Card.Title className="mt-0">{booking.title}</Card.Title>
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
                                                                <span> {booking.year}</span>
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
                                                                <BsPersonCircle
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                <span>21 biljetter</span>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xs={5} className="d-flex flex-column align-items-end">
                                                        <img
                                                            className="img-fluid rounded"
                                                            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                                                            alt="Booking Image"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <ul className="list-unstyled m-0">
                                                            <li>
                                                                <BsBuildingDown
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                Rad: 12{' '}
                                                                <BsArrowRightShort
                                                                    size={18}
                                                                    className="text-primary mx-1"
                                                                />
                                                                <div className="d-flex flex-wrap gap-2 mt-1">
                                                                    {booking.seatNumbers.map((seat, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="badge bg-primary text-black"
                                                                        >
                                                                            {seat}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                        <Row className="mx-1 mb-3">
                                            <Col className="">
                                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                                <span>Totalt: 240 kr</span>
                                            </Col>
                                        </Row>
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
