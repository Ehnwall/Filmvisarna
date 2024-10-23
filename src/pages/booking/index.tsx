import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin, BsCreditCard2Back } from 'react-icons/bs'
import { useGetShow } from '../../utils/api/booking/useGetShow'
import { useGetTickets } from '../../utils/api/booking/useGetTicket'
import TicketTypeSelector from '../../componets/TicketTypeSelector'
import ErrorBooking from './ErrorBooking'
import LoadingBooking from './LoadingBooking'

export default function BookingPage() {
    const { data: show, isLoading: isShowLoading, isError: isShowError } = useGetShow()
    const { data: tickets, isLoading: isTicketsLoading, isError: isTicketsError } = useGetTickets()
    if (isShowLoading) return <LoadingBooking />
    if (isShowError) return <ErrorBooking />
    if (isTicketsLoading) return <LoadingBooking />
    if (isTicketsError) return <ErrorBooking />
    console.log(tickets)
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
                                <TicketTypeSelector ticketType={tickets} />
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
