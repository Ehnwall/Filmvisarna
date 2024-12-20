import { useState } from 'react'
import { Card, Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
import { formatTime } from '../../utils/timeFormat'
import useGetShows from '../../utils/api/shows/useGetShows'
import { useGetBooking } from '../../utils/api/booking/useGetBooking'
import BookingView from './bookingView'

export default function AdminShows() {
    const [bookingNr, setBookingNr] = useState<string | undefined>(undefined)
    const [userEmail, setUserEmail] = useState<string | undefined>('')
    const { data: bookingdata } = useGetBooking(bookingNr || userEmail || '')
    const { data: shows, isLoading: isShowsLoading, error: showsError } = useGetShows()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaysShows = shows?.filter((show) => {
        const showDate = new Date(show.showTime)
        showDate.setHours(0, 0, 0, 0)
        return showDate.getTime() === today.getTime()
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const input = formData.get('bookingNr') as string

        if (input.includes('@')) {
            // Behandla som e-postadress
            setBookingNr(undefined)
            setUserEmail(input)
        } else {
            // Behandla som bokningsnummer
            setUserEmail(undefined)
            setBookingNr(input)
        }
    }
    return (
        <Container className="py-4">
            <h2>Sök efter biljett</h2>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Sök bokningsnummer eller e-post"
                                aria-label="Booknings Nummer"
                                aria-describedby="basic-addon2"
                                name="bookingNr"
                            />
                            <Button type="submit">
                                <IoSearchOutline />
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {bookingNr || userEmail ? (
                        Array.isArray(bookingdata) && bookingdata.length > 0 ? (
                            <BookingView data={bookingdata} />
                        ) : (
                            <p className="text-danger">Ingen bokning hittades</p>
                        )
                    ) : null}
                </Col>
            </Row>

            <h2 className="mb-4">Dagens Föreställningar</h2>
            {todaysShows && todaysShows.length > 0 ? (
                <Row className="g-4">
                    {todaysShows.map((show) => {
                        const formattedDate = formatTime(show.showTime).getWeekdayWithDate
                        const formattedTime = formatTime(show.showTime).getTime
                        return (
                            <Col key={show.showId} md={4} lg={3}>
                                <Card className="h-100 border">
                                    <Card.Body>
                                        <Card.Title>{show.movieTitle}</Card.Title>
                                        <Card.Text>
                                            {formattedDate} <br />
                                            <strong>Kl:</strong> {formattedTime} <br />
                                            {show.cinemaName} <br />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            ) : (
                <p>Inga föreställningar idag.</p>
            )}
        </Container>
    )
}
