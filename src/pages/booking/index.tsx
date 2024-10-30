import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import LoadingBooking from './LoadingBooking'
import { TICKETAMOUNT, SELECTEDSEATS } from '@/utils/types/types'
import { BookingImage, BookingInformation, TicketTypeSelector, BookingSeats } from '../../componets/booking'
import { useMakebooking } from '../../utils/api/booking/usePostBooking'
import { useGetBookingInformation } from '../../utils/api/booking/useGetBookingInformation'
import { useAuth } from '../../context/authContext'

export default function BookingPage() {
    const { showsQuery, occupiedSeatsQuery, seatsQuery, ticketsQuery } = useGetBookingInformation()

    const makebooking = useMakebooking()
    const { token } = useAuth()
    const [amount, setAmount] = useState<TICKETAMOUNT[]>([])
    const [selectedSeats, setSelectedSeats] = useState<SELECTEDSEATS[]>([])
    const [alert, setAlert] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    useEffect(() => {
        if (ticketsQuery.data) {
            const initialAmounts = ticketsQuery.data.map((ticket) => ({
                ticketId: ticket.Id,
                amount: 0,
            }))
            setAmount(initialAmounts)
        }
    }, [ticketsQuery.data])
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
        const showId = showsQuery.data && (showsQuery?.data.showId as number)
        const totalTickets = amount.reduce((acc, ticket) => acc + ticket.amount, 0)
        console.log({ showId, selectedSeats, user })
        if (totalTickets !== selectedSeats.length) {
            setAlert('Du har inte valt några platser')
            return
        }
        if (selectedSeats.length < 1) {
            setAlert('Du har inte valt några biljetter')
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
                                {showsQuery.isLoading && <LoadingBooking />}
                                {showsQuery.isError && <p>Hittade ingen show</p>}
                                {showsQuery.data && <BookingInformation show={showsQuery.data} />}
                            </Col>
                        </Row>
                        <Col xs={12}>
                            {ticketsQuery.isLoading && <LoadingBooking />}
                            {ticketsQuery.data && (
                                <TicketTypeSelector
                                    ticketType={ticketsQuery.data}
                                    amount={amount}
                                    setAmount={setAmount}
                                />
                            )}
                        </Col>
                    </Col>
                    <Col xs={12} md={3}>
                        {showsQuery.isLoading && <LoadingBooking />}
                        {showsQuery.data && <BookingImage posterUrl={showsQuery.data.posterURL} />}
                    </Col>
                </Row>
                {(occupiedSeatsQuery.isLoading || seatsQuery.isLoading) && <LoadingBooking />}
                {seatsQuery.data && occupiedSeatsQuery.data && (
                    <BookingSeats
                        occupiedSeats={occupiedSeatsQuery.data}
                        seats={seatsQuery.data}
                        tickets={amount}
                        onSeatsSelected={setSelectedSeats}
                    />
                )}

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
                    {makebooking.isError && (
                        <p className="text-center alert alert-danger w-75 text-white">
                            {makebooking.error.response?.data.msg}
                        </p>
                    )}
                </div>
            </Container>
        </>
    )
}
