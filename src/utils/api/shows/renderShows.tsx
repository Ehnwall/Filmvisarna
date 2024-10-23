import { Container, Card, Badge, Stack, Row, Col } from 'react-bootstrap'
import { useGetShows } from '../shows/useGetShows'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsClock, BsCalendar } from 'react-icons/bs'

const MoviesWithCinnema = () => {
    const { data: shows, isLoading, error } = useGetShows()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching shows</div>

    const lillaSalongenShows = shows?.filter((show) => show.cinemaName === 'Lilla salongen').slice(0, 5)

    const storaSalongenShows = shows?.filter((show) => show.cinemaName === 'Stora salongen').slice(0, 5)

    const getCurrentWeekInterval = () => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const dayDiff = (dayOfWeek + 6) % 7
        const startOfThisWeek = new Date(today.setDate(today.getDate() - dayDiff))

        const endOfThisWeek = new Date(startOfThisWeek)
        endOfThisWeek.setDate(startOfThisWeek.getDate() + 6)

        return { start: startOfThisWeek, end: endOfThisWeek }
    }

    const currentWeek = getCurrentWeekInterval()

    return (
        <>
            <Container className="py-5" id="book">
                <h4 className="py-2 ps-2 bg-primary text-dark">Välj ett datum för bio </h4>
                <Dropdown className="py-2">
                    <Dropdown.Toggle className="btn-filter" variant="primary" id="dropdown-basic">
                        Vecka 7 <BsArrowDown />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Vecka 7</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Row className="g-2">
                    {new Array(7).fill(null).map((_, index) => {
                        const dayOfWeek = new Date(currentWeek.start)
                        dayOfWeek.setDate(currentWeek.start.getDate() + index)
                        const options = { weekday: 'long', day: 'numeric', month: 'numeric' }
                        const formattedDate = dayOfWeek.toLocaleDateString('sv-SE', options)

                        return (
                            <Col key={index}>
                                <Card className="border card-dates">
                                    <Card.Body>
                                        <Card.Title>{formattedDate}</Card.Title>
                                        <Badge className="py-2 d-inline-flex align-items-center " bg="secondary">
                                            <BsCalendar className="me-2" /> Bio time
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
                        {lillaSalongenShows?.map((show) => (
                            <Card key={show.showId} className="border card-horizontal__scroll ">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img variant="top" src={show.posterURL} alt={show.movieTitle} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{show.movieTitle}</Card.Title>
                                    <Card.Text>{show.genre.join(' ')}</Card.Text>
                                    <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                        <BsClock className="me-2" />
                                        {show.showTime}
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
                    </div>
                </div>
            </Container>

            <Container className="py-5">
                <h2>Stora Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {storaSalongenShows?.map((show) => (
                            <Card key={show.showId} className="border card-horizontal__scroll">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img variant="top" src={show.posterURL} alt={show.movieTitle} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{show.movieTitle}</Card.Title>
                                    <Card.Text>{show.genre.join(' ')}</Card.Text>
                                    <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                        <BsClock className="me-2" />
                                        {show.showTime}
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
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MoviesWithCinnema
