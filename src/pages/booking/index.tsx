import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin, BsCreditCard2Back } from 'react-icons/bs'
import { useGetShow } from '../../utils/api/booking/useGetShow'
import ErrorBooking from './ErrorBooking'
import LoadingBooking from './LoadingBooking'
import BookingSeats from '../../componets/booking/BookingSeats'
import { useState } from 'react'

type Ticket = {
    ticketId: number
    amount: number
}
export type TICKETS = Ticket[]

export default function BookingPage() {
    const getShow = useGetShow()
    if (getShow.isLoading) return <LoadingBooking />
    if (getShow.isError) return <ErrorBooking />
    const show = getShow.data

    const tickets: TICKETS = [
        {
            ticketId: 1,
            amount: 2,
        },
        {
            ticketId: 2,
            amount: 2,
        },
        {
            ticketId: 3,
            amount: 2,
        },
    ]

    return (
        <>
            <Container className="py-4">
                <Row>
                    <Col xs={12} md={9}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <Card>
                                    <Card.Header className="bg-primary ">
                                        <h1 className="mb-0 text-dark ">{show?.movieTitle}</h1>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="d-flex align-items-center py-1">
                                            <BsCalendar size={18} className="text-primary me-2" />
                                            <span className="me-2">{show?.showTime.split('T')[0]}</span>
                                        </div>
                                        <div className="d-flex align-items-center py-1">
                                            <BsClock size={18} className="text-primary me-2" />
                                            <span className="me-2">{show?.showTime.split('T')[1]}</span>
                                        </div>
                                        {/* //ändra till duration i korrekt format */}
                                        <div className="d-flex align-items-center py-1">
                                            <BsClock size={18} className="text-primary me-2" />
                                            <span>{show?.duration} min</span>
                                        </div>
                                        <div className="d-flex align-items-center py-1">
                                            <BsPin size={18} className="text-primary me-2" />
                                            <span className="me-2">{show?.cinemaName}</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                                0{' '}
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
                                                <div className="text-center">80 kr</div>
                                                <ButtonGroup className="btn-group-sm ms-5">
                                                    <Button variant="outline-primary px-3">-</Button>
                                                    <Button
                                                        className="bg-body-tertiary pb-2"
                                                        variant="outline-primary px-3"
                                                    >
                                                        0
                                                    </Button>
                                                    <Button variant="outline-primary px-3">+</Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col xs={12} lg={8} className="d-flex justify-content-left mb-3">
                                                <div className="fw-bold" style={{ minWidth: '91px' }}>
                                                    Pensionär
                                                </div>
                                                <div className="text-center ">120 kr</div>
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
                                                <div className="text-center ms-2">140 kr</div>
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
                            <Image className="rounded" src={show?.posterURL} />
                        </Card>
                    </Col>
                </Row>
                <div className="seat-picker rounded-3 overflow-auto my-5">
                    {show && <BookingSeats show={show} tickets={tickets} />}
                </div>

                <Row className="gy-4">
                    <Card>
                        <Card.Header className="bg-primary ">
                            <h3 className="mb-0 text-dark text-center">Ange dina uppgifter</h3>
                        </Card.Header>
                    </Card>
                    <div className="d-flex flex-column align-items-center">
                        {[
                            { label: 'Namn', type: 'text' },
                            { label: 'Efternamn', type: 'text' },
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
