import { useGetOccupiedSeats } from '../../utils/api/booking/useGetOccupiedSeats'
import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
import { formatTime } from '../../utils/timeFormat'
import useGetShows from '../../utils/api/shows/useGetShows'
import { useGetBooking } from '../../utils/api/booking/useGetBooking'
import BookingView from './bookingView'

export default function AdminShows() {
    const [bookingNr, setBookingNr] = useState<string | undefined>(undefined)
    const { data: bookingdata } = useGetBooking(bookingNr || '')
    const { data: shows, isLoading: isShowsLoading, error: showsError } = useGetShows()
    const booking = Array.isArray(bookingdata) && bookingdata.length > 0 ? bookingdata[0] : null

    const [occupiedSeatsMap, setOccupiedSeatsMap] = useState<{ [key: number]: number }>({})

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaysShows = shows?.filter((show) => {
        const showDate = new Date(show.showTime)
        showDate.setHours(0, 0, 0, 0)
        return showDate.getTime() === today.getTime()
    })

    const fetchOccupiedSeats = async (shows: any[]) => {
        const seatsMap: { [key: number]: number } = {}

        const seatPromises = shows.map(async (show) => {
            const { data, error } = await useGetOccupiedSeats(show.showId)
            if (error) {
                console.error(`Error fetching occupied seats for show ${show.showId}: ${error}`)
                return { showId: show.showId, occupiedSeatsCount: 0 }
            }
            const occupiedSeatsCount = data?.occupiedSeats.length || 0
            return { showId: show.showId, occupiedSeatsCount }
        })

        const seatResults = await Promise.all(seatPromises)

        seatResults.forEach((result) => {
            seatsMap[result.showId] = result.occupiedSeatsCount
        })

        setOccupiedSeatsMap(seatsMap)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const bookingNrString = formData.get('bookingNr') as string

        setBookingNr(bookingNrString)
    }

    useEffect(() => {}, [todaysShows])

    return (
        <Container className="py-4">
            <h2>Sök efter biljett</h2>

            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3 w-50 ">
                            <Form.Control
                                type="text"
                                placeholder="Sök bokningsnummer"
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
                    {bookingNr &&
                        (booking ? (
                            <BookingView data={booking} />
                        ) : (
                            <p className="text-danger">Ingen bokning hittades</p>
                        ))}
                </Col>
            </Row>

            <h2 className="mb-4">Dagens Föreställningar</h2>
            {todaysShows && todaysShows.length > 0 ? (
                <Row className="g-4">
                    {todaysShows.map((show) => {
                        const formattedDate = formatTime(show.showTime).getWeekdayWithDate
                        const formattedTime = formatTime(show.showTime).getTime
                        const occupiedSeatsCount = occupiedSeatsMap[show.showId] || 0

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
                                        <p>
                                            <strong>Bokade platser:</strong> {occupiedSeatsCount}
                                        </p>
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
