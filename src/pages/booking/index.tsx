import { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form, Stack } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin, BsCreditCard2Back } from 'react-icons/bs'
import { useGetShow } from '../../utils/api/booking/useGetShow'
import { useGetTickets } from '../../utils/api/booking/useGetTicket'
import ErrorBooking from './ErrorBooking'
import LoadingBooking from './LoadingBooking'

interface TicketAmount {
    ticketId: number
    amount: number
}

export default function BookingPage() {
    const { data: show, isLoading: isShowLoading, isError: isShowError } = useGetShow()
    const { data: tickets, isLoading: isTicketsLoading, isError: isTicketsError } = useGetTickets()

    if (isShowLoading || isTicketsLoading) return <LoadingBooking />
    if (isShowError || isTicketsError) return <ErrorBooking />

    if (!tickets) {
        console.error('Tickets data is undefined')
        return <ErrorBooking />
    }
    // const ticketAmount = tickets.map((ticket) => ({
    //     ticketId: ticket.Id,
    //     amount: 0,
    // }))
    const [amount, setAmount] = useState<TicketAmount[]>([])

    const handleIncrease = (ticketId: number) => {
        setAmount((prev) =>
            prev.map((ticket) => (ticket.ticketId === ticketId ? { ...ticket, amount: ticket.amount + 1 } : ticket))
        )
    }
    useEffect(() => {
        if (tickets) {
            const ticketAmount = tickets.map((ticket) => ({
                ticketId: ticket.Id,
                amount: 0,
            }))
            setAmount(ticketAmount)
        }
    }, [tickets])
    const handleDecrease = (ticketId: number) => {
        setAmount((prev) =>
            prev.map((ticket) =>
                ticket.ticketId === ticketId && ticket.amount > 0 ? { ...ticket, amount: ticket.amount - 1 } : ticket
            )
        )
    }

    const total = amount.reduce((acc, ticket) => {
        const foundTicketType = tickets.find((t) => t.Id === ticket.ticketId)
        return acc + (foundTicketType ? foundTicketType.price * ticket.amount : 0)
    }, 0)

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
                                </Card>{' '}
                            </Col>
                            <Col xs={12}>
                                <div>
                                    <Card>
                                        <Card.Header className="bg-primary">
                                            <h3 className="mb-0 text-dark">Antal Biljetter</h3>
                                        </Card.Header>
                                        <Card.Body>
                                            <Stack gap={2}>
                                                {tickets.map((ticket, index) => (
                                                    <Row key={ticket.ticketType} className="">
                                                        <Col sm="2" xs="8" className="d-flex gap-1">
                                                            <div className="mb-2">{ticket.ticketType} </div>
                                                        </Col>
                                                        <Col sm="2" xs="4">
                                                            <div className="d-flex justify-content-center">
                                                                {ticket.price} kr
                                                            </div>
                                                        </Col>
                                                        <Col sm="3">
                                                            <ButtonGroup className="btn-group-sm d-flex mb-4">
                                                                <Button
                                                                    className="btn-outline-primary px-3  btn-ticket-counter btn-ticket-counter-minus
                                            "
                                                                    variant="outline-primary"
                                                                    onClick={() => handleDecrease(ticket.Id)}
                                                                >
                                                                    -
                                                                </Button>
                                                                <Button
                                                                    className="bg-body-tertiary pb-2"
                                                                    variant="outline-primary px-3"
                                                                >
                                                                    {
                                                                        amount.find(
                                                                            (ticketTypeChoosen) =>
                                                                                ticketTypeChoosen.ticketId === ticket.Id
                                                                        )?.amount
                                                                    }
                                                                </Button>
                                                                <Button
                                                                    className="btn-outline-primary px-3  btn-ticket-counter
                                            "
                                                                    variant="outline-primary px-3"
                                                                    onClick={() => handleIncrease(ticket.Id)}
                                                                >
                                                                    +
                                                                </Button>
                                                            </ButtonGroup>
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <div className="fw-bold" style={{ minWidth: '100px' }}>
                                                    <BsCreditCard2Back size={18} className="text-primary me-2" />
                                                    Total: {total} kr
                                                </div>
                                            </Stack>
                                        </Card.Body>
                                    </Card>
                                </div>
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
