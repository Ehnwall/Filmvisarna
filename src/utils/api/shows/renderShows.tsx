import { Container, Card, Badge, Stack } from 'react-bootstrap'
import { BsClock } from 'react-icons/bs'
import { useGetShows } from '../shows/useGetShows'

const MoviesWithCinnema = () => {
    const { data: shows, isLoading, error } = useGetShows()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching shows</div>

    const lillaSalongenShows = shows?.filter((show) => show.cinemaName === 'Lilla salongen').slice(0, 5)

    const storaSalongenShows = shows?.filter((show) => show.cinemaName === 'Stora salongen').slice(0, 5)

    return (
        <>
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
