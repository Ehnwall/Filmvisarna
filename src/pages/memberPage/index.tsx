import { useGetBookings } from '../../utils/api/booking/useGetBookings'
import React, { useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import {
    BsReceipt,
    BsCalendar,
    BsClock,
    BsPin,
    BsPersonCircle,
    BsBuildingDown,
    BsArrowRightShort,
    BsCreditCard2Back,
} from 'react-icons/bs'
import { ToastContainer } from 'react-toastify'

type SEAT = {
    seatRow: number
    seatNumber: number
    ticketType: string
    ticketPrice: number
}

type USERBOOKING = {
    bookingId: number
    bookingNumberId: string
    userId: number
    userEmail: string
    userFirstname: string
    userLastname: string
    showTime: string
    cinemaName: string
    movieTitle: string
    movieUrl: string
    seats: SEAT[]
}

const MemberPage = () => {
    const { data: bookings = [] } = useGetBookings()
    const groupSeatsByRow = (seats: SEAT[]) => {
        return seats.reduce((acc, seat) => {
            const { seatRow, seatNumber } = seat
            if (!acc[seatRow]) {
                acc[seatRow] = []
            }
            acc[seatRow].push(seatNumber)
            return acc
        }, {} as Record<number, number[]>)
    }
    const splitBookings = (bookings: USERBOOKING[]) => {
        const currentDate = new Date()

        const currentBookings = bookings.filter((booking) => new Date(booking.showTime) >= currentDate)

        const pastBookings = bookings.filter((booking) => new Date(booking.showTime) < currentDate)

        return { currentBookings, pastBookings }
    }

    const { currentBookings, pastBookings } = splitBookings(bookings)

    return (
        <Container className="py-5">
            <h1 className="text-center pb-4">Medlemssida</h1>
            <Card className="pb-5">
                <Card.Header className="bg-primary">
                    <h2 className="h4 mb-0 text-dark">Aktuella Bokningar</h2>
                </Card.Header>
                <Card.Body className="p-0">
                    <Row className="">
                        {currentBookings.map((booking: USERBOOKING) => {
                            const groupedSeats = groupSeatsByRow(booking.seats)
                            return (
                                <Col key={booking.bookingId} sm={6} lg={4} xl={3} className="g-4">
                                    <Card className="border h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{booking.movieTitle}</Card.Title>
                                            <Card.Text className="flex-grow-1">
                                                <Row>
                                                    <Col xs={7} className="d-flex align-items-center">
                                                        <ul className="list-unstyled m-0">
                                                            <li>
                                                                <BsReceipt size={18} className="text-primary me-2" />
                                                                <span>{booking.bookingNumberId}</span>
                                                            </li>
                                                            <li>
                                                                <BsCalendar size={18} className="text-primary me-2" />
                                                                <span>
                                                                    {new Date(booking.showTime).toLocaleDateString()}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <BsClock size={18} className="text-primary me-2" />
                                                                <span>
                                                                    {new Date(booking.showTime).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <BsPin size={18} className="text-primary me-2" />
                                                                <span>{booking.cinemaName}</span>
                                                            </li>
                                                            <li>
                                                                <BsPersonCircle
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                <span>{booking.seats.length} biljetter</span>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xs={5} className="d-flex flex-column align-items-end">
                                                        <img
                                                            className="img-fluid"
                                                            src={booking.movieUrl}
                                                            alt={booking.movieTitle}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <ul className="list-unstyled m-0">
                                                            {Object.keys(groupedSeats).map((row) => (
                                                                <li key={row}>
                                                                    <BsBuildingDown
                                                                        size={18}
                                                                        className="text-primary me-2"
                                                                    />
                                                                    Rad: {row}{' '}
                                                                    <BsArrowRightShort
                                                                        size={18}
                                                                        className="text-primary mx-1"
                                                                    />
                                                                    <div className="d-flex flex-wrap gap-2 mt-1">
                                                                        {groupedSeats[parseInt(row)].map(
                                                                            (seatNumber) => (
                                                                                <span
                                                                                    key={seatNumber}
                                                                                    className="badge bg-primary text-black"
                                                                                >
                                                                                    {seatNumber}
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            <div>
                                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                                <span>Totalpris:</span>
                                            </div>
                                            <div className="d-grid mt-4">
                                                <Button className="mt-auto" variant="outline-danger">
                                                    Avboka
                                                </Button>
                                                <ToastContainer />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header className="bg-primary">
                    <h2 className="h4 mb-0 text-dark">Bokningshistorik</h2>
                </Card.Header>
                <Card.Body className="p-0">
                    <Row className="">
                        {pastBookings.map((booking: USERBOOKING) => {
                            const groupedSeats = groupSeatsByRow(booking.seats)
                            return (
                                <Col key={booking.bookingId} sm={6} lg={4} xl={3} className="g-4">
                                    <Card className="border h-100">
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{booking.movieTitle}</Card.Title>
                                            <Card.Text className="flex-grow-1">
                                                <Row>
                                                    <Col xs={7} className="d-flex align-items-center">
                                                        <ul className="list-unstyled m-0">
                                                            <li>
                                                                <BsReceipt size={18} className="text-primary me-2" />
                                                                <span>{booking.bookingNumberId}</span>
                                                            </li>
                                                            <li>
                                                                <BsCalendar size={18} className="text-primary me-2" />
                                                                <span>
                                                                    {new Date(booking.showTime).toLocaleDateString()}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <BsClock size={18} className="text-primary me-2" />
                                                                <span>
                                                                    {new Date(booking.showTime).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <BsPin size={18} className="text-primary me-2" />
                                                                <span>{booking.cinemaName}</span>
                                                            </li>
                                                            <li>
                                                                <BsPersonCircle
                                                                    size={18}
                                                                    className="text-primary me-2"
                                                                />
                                                                <span>{booking.seats.length} biljetter</span>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xs={5} className="d-flex flex-column align-items-end">
                                                        <img
                                                            className="img-fluid"
                                                            src={booking.movieUrl}
                                                            alt={booking.movieTitle}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <ul className="list-unstyled m-0">
                                                            {Object.keys(groupedSeats).map((row) => (
                                                                <li key={row}>
                                                                    <BsBuildingDown
                                                                        size={18}
                                                                        className="text-primary me-2"
                                                                    />
                                                                    Rad: {row}{' '}
                                                                    <BsArrowRightShort
                                                                        size={18}
                                                                        className="text-primary mx-1"
                                                                    />
                                                                    <div className="d-flex flex-wrap gap-2 mt-1">
                                                                        {groupedSeats[parseInt(row)].map(
                                                                            (seatNumber) => (
                                                                                <span
                                                                                    key={seatNumber}
                                                                                    className="badge bg-primary text-black"
                                                                                >
                                                                                    {seatNumber}
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                            <div>
                                                <BsCreditCard2Back size={18} className="text-primary me-2" />
                                                <span>Totalpris:</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default MemberPage
