import { Container, Row, Col, Card, Stack, Accordion, Badge, Button, ButtonGroup } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'

export default function IndividualMovie() {
    const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useGetOneMovie()

    if (isMovieLoading) {
        return <div></div>
    }

    if (isMovieError) {
        return <div>Error fetching user</div>
    }

    function convertMinutesToHoursAndMinutes(minutes: any) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return {
            hours,
            minutes: remainingMinutes,
        }
    }

    let min = movie?.durationMin

    const time = convertMinutesToHoursAndMinutes(min)

    return (
        <>
            <Container className="pt-5">
                <h1 className="display-4 mb-1">{movie?.title}</h1>
                <div className="d-flex align-items-center mb-3">
                    <BsClock size={18} className="text-primary me-2" />
                    <span>
                        {time.hours} tim {time.minutes} min
                    </span>
                    <span className="px-2">|</span>
                    <span>Från {movie?.ageLimit} år</span>
                </div>
                <Row className="g-1">
                    {movie?.description?.genre?.map((genre: any, index: any) => (
                        <Col xs="auto" key={index}>
                            <Badge bg="primary" className="mb-4 fs-6 text-dark">
                                {genre}
                            </Badge>
                        </Col>
                    ))}
                </Row>
                <Row className="g-4">
                    <Col md={{ order: 'last' }} lg={3}>
                        <Card>
                            <img src={movie?.posterUrl} alt={movie?.title} />
                        </Card>
                    </Col>
                    <Col lg={9}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <Card className="border-primary">
                                    <Card.Header className="bg-primary">
                                        <h2 className="h4 mb-0 text-dark">Biljetter</h2>
                                    </Card.Header>
                                    <Card.Body className="p-0 pt-3">
                                        <Row className="g-3">
                                            {[...Array(6)].map((_, index) => (
                                                <Col key={index} xs={12} sm={6} md={4}>
                                                    <Card className="h-100 border-1">
                                                        <Card.Body className="d-flex flex-column">
                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <div className="d-flex align-items-center">
                                                                    <BsCalendar
                                                                        size={18}
                                                                        className="text-primary me-2"
                                                                    />
                                                                    <span className="fw-bold me-2">Tisdag </span>
                                                                    <Badge bg="secondary">{25 + index}/09</Badge>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <BsClock size={18} className="text-primary me-2" />
                                                                <span>17:30</span>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                <BsPin size={18} className="text-primary me-2" />
                                                                <span>Södra</span>
                                                            </div>
                                                            <Card.Link
                                                                className="btn btn-outline-primary mt-auto w-100"
                                                                href="/booking-page"
                                                            >
                                                                Boka
                                                            </Card.Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Läs mer om filmen</Accordion.Header>
                                        <Accordion.Body>
                                            <Stack gap={3}>
                                                <p>{movie?.description?.synopsis}</p>
                                                <Row>
                                                    <Col sm={6} md={4}>
                                                        <h5>Regi</h5>
                                                        <p>{movie?.description.director}</p>
                                                    </Col>
                                                    <Col sm={6} md={4}>
                                                        <h5>Skådespelare</h5>
                                                        {movie?.description.cast.map((cast, index) => (
                                                            <p key={index}> {cast}</p>
                                                        ))}
                                                    </Col>
                                                    <Col sm={6} md={4}>
                                                        <h5>Originaltitel</h5>
                                                        <p>{movie?.title}</p>
                                                    </Col>
                                                    <Col sm={6} md={4}>
                                                        <h5>Originalspråk</h5>
                                                        {movie?.description.language.map((lang, index) => (
                                                            <p key={index}>{lang}</p>
                                                        ))}
                                                    </Col>
                                                    <Col sm={12} md={8}>
                                                        <h5>Åldersgräns</h5>
                                                        <p>Från {movie?.ageLimit} år</p>
                                                    </Col>
                                                </Row>
                                            </Stack>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Col xs={12}>
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${movie?.trailerUrl}`}
                                        title={`${movie?.title} | Official Teaser Trailer`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
