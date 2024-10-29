import { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button, ButtonGroup, Card, Form, Stack } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin, BsCreditCard2Back } from 'react-icons/bs'
import { useGetShow } from '../../utils/api/booking/useGetShow'
import { useGetTickets } from '../../utils/api/booking/useGetTicket'
import ErrorBooking from './ErrorBooking'
import LoadingBooking from './LoadingBooking'
import TicketTypeSelector from '../../componets/TicketTypeSelector'
import { TICKETAMOUNT, SELECTEDSEATS } from '@/utils/types/types'
import BookingSeats from '../../componets/booking/BookingSeats'
import { useMakebooking } from '../../utils/api/booking/usePostBooking'

export default function BookingPage() {
    const { data: show, isLoading: isShowLoading, isError: isShowError } = useGetShow()
    const { data: tickets, isLoading: isTicketsLoading, isError: isTicketsError } = useGetTickets()
    const makebooking = useMakebooking()

    // if (isShowLoading) return <LoadingBooking />

    // if (isShowLoading || isTicketsLoading) return <LoadingBooking />
    // if (isShowError || isTicketsError) return <ErrorBooking />

    // if (!tickets) {
    //     console.error('Tickets data is undefined')
    //     return <ErrorBooking />
    // }

    const [amount, setAmount] = useState<TICKETAMOUNT[]>([])
    const [selectedSeats, setSelectedSeats] = useState<SELECTEDSEATS[]>([])
    useEffect(() => {
        if (tickets) {
            const initialAmounts = tickets.map((ticket) => ({
                ticketId: ticket.Id,
                amount: 0,
            }))
            setAmount(initialAmounts)
        }
    }, [tickets])

    const handleSubmmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const showId = show?.showId as number

        makebooking.mutate({ showId, seats: selectedSeats })
    }
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
                                <TicketTypeSelector ticketType={tickets || []} amount={amount} setAmount={setAmount} />
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
                    {show && <BookingSeats show={show} tickets={amount} onSeatsSelected={setSelectedSeats} />}
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
                        <button className="btn btn-outline-primary" onClick={handleSubmmit}>
                            Boka Platser
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
