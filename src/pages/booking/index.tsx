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
import { Value } from 'sass'
import { onChange } from 'react-toastify/dist/core/store'
import { useAuth } from '../../context/authContext'

export default function BookingPage() {
    const { data: show, isLoading: isShowLoading, isError: isShowError } = useGetShow()
    const { data: tickets, isLoading: isTicketsLoading, isError: isTicketsError } = useGetTickets()
    const makebooking = useMakebooking()
    const { token } = useAuth()
    const [amount, setAmount] = useState<TICKETAMOUNT[]>([])
    const [selectedSeats, setSelectedSeats] = useState<SELECTEDSEATS[]>([])
    const [alert, setAlert] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    useEffect(() => {
        if (tickets) {
            const initialAmounts = tickets.map((ticket) => ({
                ticketId: ticket.Id,
                amount: 0,
            }))
            setAmount(initialAmounts)
        }
    }, [tickets])
    useEffect(() => {
        const totalTickets = amount.reduce((acc, ticket) => acc + ticket.amount, 0)
        if (selectedSeats.length === totalTickets) {
            setAlert('')
        }
    }, [amount, selectedSeats])
    const handleSubmmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const user = {
            email,
            firstName,
            lastName,
        }
        console.log(user)
        const showId = show?.showId as number
        const totalTickets = amount.reduce((acc, ticket) => acc + ticket.amount, 0)
        if (totalTickets !== selectedSeats.length) {
            setAlert('Du har inte valt rätt antal biljetter')
            return
        }
        if (!token) makebooking.mutate({ showId, seats: selectedSeats, user })
        else makebooking.mutate({ showId, seats: selectedSeats })
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
                    {!token && (
                        <>
                            <Card>
                                <Card.Header className="bg-primary ">
                                    <h3 className="mb-0 text-dark text-center">Ange dina uppgifter</h3>
                                </Card.Header>
                            </Card>
                            <div className="d-flex flex-column align-items-center">
                                {[
                                    { label: 'E-post', type: 'email', value: email, onChange: setEmail },
                                    { label: 'Förnamn', type: 'text', value: firstName, onChange: setFirstName },
                                    { label: 'Efternamn', type: 'text', value: lastName, onChange: setLastName },
                                ].map(({ label, type, value, onChange }) => (
                                    <Col md={4} key={label}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>{label}</Form.Label>
                                            <Form.Control
                                                type={type}
                                                placeholder={`Ange ditt ${label.toLowerCase()}`}
                                                value={value}
                                                onChange={(e) => onChange(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </div>
                        </>
                    )}
                    <Col className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary" onClick={handleSubmmit}>
                            Boka Platser
                        </button>
                    </Col>
                </Row>
                <div className=" d-flex justify-content-center align-items-center mt-3">
                    {alert && <p className="text-center alert alert-danger w-75 text-white">{alert}</p>}
                </div>
            </Container>
        </>
    )
}
