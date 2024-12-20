import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoadingBooking from './LoadingBooking'
import { TICKETAMOUNT, SELECTEDSEATS } from '@/utils/types/types'
import { BookingImage, BookingInformation, TicketTypeSelector, BookingSeats } from '../../componets/booking'
import { useMakebooking } from '../../utils/api/booking/usePostBooking'
import { useGetBookingInformation } from '../../utils/api/booking/useGetBookingInformation'
import { useAuth } from '../../context/authContext'
import UserDetailsForm from '../../componets/booking/BookingForm'

export default function BookingPage() {
    const { showsQuery, seatsQuery, ticketsQuery } = useGetBookingInformation()

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
        if (ticketTypeAmountSum > selectedSeats.length) {
            setAlert(
                `Du har ${ticketTypeAmountSum - selectedSeats.length} ${
                    ticketTypeAmountSum - selectedSeats.length === 1 ? 'plats' : 'platser'
                } kvar att välja`
            )
        }
    }, [amount, selectedSeats])
    const handleSubmmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const user = {
            email,
            firstName,
            lastName,
        }
        const showId = showsQuery.data && showsQuery?.data.showId
        const totalTickets = amount.reduce((acc, ticket) => acc + ticket.amount, 0)
        if (totalTickets !== selectedSeats.length) {
            setAlert(
                `Du har ${ticketTypeAmountSum - selectedSeats.length} ${
                    ticketTypeAmountSum - selectedSeats.length === 1 ? 'plats' : 'platser'
                } kvar att välja`
            )
            return
        }
        if (selectedSeats.length < 1) {
            setAlert('Du har inte valt några biljetter')
            return
        }
        if (!token) makebooking.mutate({ showId, seats: selectedSeats, user })
        else makebooking.mutate({ showId, seats: selectedSeats })
    }
    const ticketTypeAmountSum = amount.reduce((acc, ticketType) => acc + ticketType.amount, 0)
    return (
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
                            <TicketTypeSelector ticketType={ticketsQuery.data} amount={amount} setAmount={setAmount} />
                        )}
                    </Col>
                </Col>
                <Col xs={12} md={3}>
                    {showsQuery.isLoading && <LoadingBooking />}
                    {showsQuery.data && <BookingImage posterUrl={showsQuery.data.posterURL} />}
                </Col>
            </Row>
            {seatsQuery.isLoading && <LoadingBooking />}
            {seatsQuery.data && (
                <BookingSeats seats={seatsQuery.data} tickets={amount} onSeatsSelected={setSelectedSeats} />
            )}

            <Row className="gy-4">
                {!token && (
                    <UserDetailsForm
                        email={email}
                        setEmail={setEmail}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                    />
                )}

                <Col className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary" onClick={handleSubmmit}>
                        Boka Platser
                    </button>
                </Col>
            </Row>
            <div className="d-flex justify-content-center align-items-center mt-3">
                {alert && <p className="text-center alert alert-danger w-75 text-white">{alert}</p>}
                {makebooking.isError && (
                    <p className="text-center alert alert-danger w-75 text-white">
                        {makebooking.error.response?.data.msg}
                    </p>
                )}
            </div>
        </Container>
    )
}
