import { useGetBookings } from '../../utils/api/booking/useGetBookings'
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap'
import { USERBOOKING } from '@/utils/types/types'
import MemberBookingCard from './memberBookingCard'
import { BsTicket } from 'react-icons/bs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export default function CheckMember() {
    const navigate = useNavigate()
    const { token } = useAuth()

    const { data: bookings = [], isLoading, error } = useGetBookings()
    const splitBookings = (bookings: USERBOOKING[]) => {
        const currentDate = new Date()
        const currentBookings = bookings.filter((booking) => new Date(booking.showTime) >= currentDate)
        const pastBookings = bookings.filter((booking) => new Date(booking.showTime) < currentDate)
        return { currentBookings, pastBookings }
    }
    useEffect(() => {
        if (!token) {
            navigate('/logga-in')
        }
    }, [token])
    const { currentBookings, pastBookings } = splitBookings(bookings)

    return (
        <Container className="py-5">
            <h1 className="text-center pb-4">Medlemssida</h1>
            <Card className="pb-5">
                <Card.Header className="bg-primary">
                    <h2 className="h4 mb-0 text-dark">Aktuella Bokningar</h2>
                </Card.Header>
                <Card.Body className="p-0">
                    <Row>
                        {isLoading && (
                            <Col className="text-center py-4">
                                <Spinner animation="border"></Spinner>
                            </Col>
                        )}
                        {error && (
                            <Col className="text-center py-4">
                                <span>Kunde inte ladda aktuella bokningar. Försök igen senare.</span>
                            </Col>
                        )}
                        {currentBookings.length > 0
                            ? currentBookings.map((booking: USERBOOKING) => (
                                  <MemberBookingCard key={booking.bookingId} booking={booking} isCurrent={true} />
                              ))
                            : !isLoading &&
                              !error && (
                                  <Col className="text-center py-4">
                                      <div className="d-flex flex-column align-items-center">
                                          <BsTicket size={50} className="text-muted mb-3" />
                                          <p className="text-muted">Inga aktuella bokningar</p>
                                      </div>
                                  </Col>
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
                        {isLoading && (
                            <Col className="text-center py-4">
                                <Spinner animation="border"></Spinner>
                            </Col>
                        )}
                        {error && (
                            <Col className="text-center py-4">
                                <span>Kunde inte ladda bokningshistorik. Försök igen senare.</span>
                            </Col>
                        )}
                        {pastBookings.length > 0
                            ? pastBookings.map((booking: USERBOOKING) => (
                                  <MemberBookingCard key={booking.bookingId} booking={booking} isCurrent={false} />
                              ))
                            : !isLoading &&
                              !error && (
                                  <Col className="text-center py-4">
                                      <div className="d-flex flex-column align-items-center">
                                          <BsTicket size={50} className="text-muted mb-3" />
                                          <p className="text-muted">Ingen bokningshistorik</p>
                                      </div>
                                  </Col>
                              )}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
