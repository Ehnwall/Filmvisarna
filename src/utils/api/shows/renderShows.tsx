import { Container, Card, Badge, Stack, Row, Col } from 'react-bootstrap'
import { useGetShows } from '../shows/useGetShows'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsClock, BsCalendar } from 'react-icons/bs'
import { useState } from 'react'

const MoviesWithCinnema = () => {
    const { data: shows, isLoading, error } = useGetShows()
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(0)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching shows</div>

    const lillaSalongenShows = shows?.filter((show) => show.cinemaName === 'Lilla salongen')
    const storaSalongenShows = shows?.filter((show) => show.cinemaName === 'Stora salongen')

    const today = new Date()

    const isPastDay = (date) => {
        return date < today.setHours(0, 0, 0, 0)
    }

    const getWeekInterval = (weeksAhead = 0) => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const dayDiff = (dayOfWeek + 6) % 7
        const startOfThisWeek = new Date(today.setDate(today.getDate() - dayDiff + weeksAhead * 7))

        const endOfThisWeek = new Date(startOfThisWeek)
        endOfThisWeek.setDate(startOfThisWeek.getDate() + 6)

        return { start: startOfThisWeek, end: endOfThisWeek }
    }

    const getShowsForDate = (date) => {
        if (!date) return []
        return shows?.filter((show) => {
            const showDate = new Date(show.showTime)
            showDate.setHours(0, 0, 0, 0)
            date.setHours(0, 0, 0, 0)
            return showDate.getTime() === date.getTime()
        })
    }
    function disabledShowClass(...classes: (string | boolean | undefined)[]): string {
        return classes.filter(Boolean).join(' ')
    }

    const handleWeekSelect = (weeksAhead: number) => {
        setSelectedWeek(weeksAhead)
        setSelectedDate(null)
    }
    const currentWeek = getWeekInterval(selectedWeek)

    return (
        <>
            <Container>
                <Dropdown className="py-2">
                    <Dropdown.Toggle className="btn-filter mb-3 mt-2" variant="primary" id="dropdown-basic">
                        Vecka {selectedWeek + 43} <BsArrowDown />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {[...Array(4)].map((_, weekIndex) => (
                            <Dropdown.Item key={weekIndex} onClick={() => handleWeekSelect(weekIndex)}>
                                Vecka {weekIndex + 43}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Row className="g-2">
                    {new Array(7).fill(null).map((_, index) => {
                        const dayOfWeek = new Date(currentWeek.start)
                        dayOfWeek.setDate(currentWeek.start.getDate() + index)

                        const options = { weekday: 'long', day: 'numeric', month: 'numeric' }
                        const formattedDate = dayOfWeek.toLocaleDateString('sv-SE', options)

                        const isPast = isPastDay(dayOfWeek)
                        const isSelected = selectedDate && selectedDate.toDateString() === dayOfWeek.toDateString()

                        return (
                            <Col key={index}>
                                <Card
                                    className={disabledShowClass(
                                        'border card-dates',
                                        isPast && 'bg-date-picker text-muted',
                                        !isPast && 'hoverable',
                                        isSelected && 'bg-primary text-white'
                                    )}
                                    onClick={() => !isPast && setSelectedDate(dayOfWeek)}
                                    style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{formattedDate}</Card.Title>
                                        <Badge className="py-2 d-inline-flex align-items-center" bg="secondary">
                                            <BsCalendar className="me-2" /> vilken dag passar dig
                                        </Badge>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            <Container className="py-5">
                <h2>Lilla Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {lillaSalongenShows &&
                            getShowsForDate(selectedDate)?.map((show) => (
                                <Card key={show.showId} className="border card-horizontal__scroll ">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img variant="top" src={show.posterURL} alt={show.movieTitle} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{show.movieTitle}</Card.Title>
                                        <Card.Text>{show.genre.join(' ')}</Card.Text>
                                        <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                            <BsClock className="me-2" />
                                            {new Date(show.showTime).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Badge>
                                        <Stack direction="horizontal" gap={3} className="mt-2">
                                            <Badge bg="none" className="border">
                                                {Math.floor(show.duration / 60)} tim {show.duration % 60} min
                                            </Badge>
                                            <Badge bg="none" className="border">
                                                Från {show.ageLimit} År
                                            </Badge>
                                        </Stack>
                                    </Card.Body>
                                    <a className="btn btn-outline-primary mx-2 mb-2" href="/booking-page">
                                        Boka
                                    </a>
                                </Card>
                            ))}
                        {lillaSalongenShows && getShowsForDate(selectedDate)?.length === 0 && (
                            <p className="bg-date-picker p-2 rounded ">
                                Inga filmer tillgängliga för det valda datumet
                            </p>
                        )}
                    </div>
                </div>
            </Container>

            <Container className="py-5">
                <h2>Stora Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {storaSalongenShows &&
                            getShowsForDate(selectedDate)?.map((show) => (
                                <Card key={show.showId} className="border card-horizontal__scroll">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img variant="top" src={show.posterURL} alt={show.movieTitle} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{show.movieTitle}</Card.Title>
                                        <Card.Text>{show.genre.join(' ')}</Card.Text>
                                        <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                            <BsClock className="me-2" />
                                            {new Date(show.showTime).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Badge>
                                        <Stack direction="horizontal" gap={3} className="mt-2">
                                            <Badge bg="none" className="border">
                                                {Math.floor(show.duration / 60)} tim {show.duration % 60} min
                                            </Badge>
                                            <Badge bg="none" className="border">
                                                Från {show.ageLimit} År
                                            </Badge>
                                        </Stack>
                                    </Card.Body>
                                    <a className="btn btn-outline-primary mx-2 mb-2" href="/booking-page">
                                        Boka
                                    </a>
                                </Card>
                            ))}
                        {storaSalongenShows && getShowsForDate(selectedDate)?.length === 0 && (
                            <p className="bg-date-picker p-2 rounded ">
                                Inga filmer tillgängliga för det valda datumet
                            </p>
                        )}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MoviesWithCinnema
