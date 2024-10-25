import { Container, Row, Col, Card } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsArrowDownCircle, BsClock, BsCalendar, BsFilm } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import RenderMovies from '../../componets/startPage/renderMovies'
const movies = {
    avengers: {
        title: 'Avengers',
        poster: {
            liggande: 'https://pbs.twimg.com/media/D4pgj_BVUAAbCTd.jpg:large',
            stående: 'https://img.fruugo.com/product/7/41/14532417_max.jpg',
        },
        timeHour: 2,
        timeMin: 15,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    interstellar: {
        title: 'Interstellar',
        poster: {
            liggande:
                'https://www.wallpaperflare.com/static/912/656/60/interstellar-movie-movies-monochrome-movie-poster-wallpaper.jpg',
            stående: 'https://static.posters.cz/image/750/poster/interstellar-one-sheet-i23157.jpg',
        },
        timeHour: 2,
        timeMin: 20,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    shangchi: {
        title: 'Shang-Chi',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående:
                'https://static.posters.cz/image/1300/poster/shang-chi-and-the-legend-of-the-ten-rings-flex-i114390.jpg',
        },
        timeHour: 2,
        timeMin: 20,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    StarWars: {
        title: 'Star Wars',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående: 'https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg',
        },
        timeHour: 2,
        timeMin: 50,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },

    StarWars2: {
        title: 'Star Wars',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående: 'https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg',
        },
        timeHour: 2,
        timeMin: 50,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    StarWars3: {
        title: 'Star Wars',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående: 'https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg',
        },
        timeHour: 2,
        timeMin: 50,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    StarWars4: {
        title: 'Star Wars',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående: 'https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg',
        },
        timeHour: 2,
        timeMin: 50,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
    StarWars5: {
        title: 'Star Wars',
        poster: {
            liggande: 'https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg',
            stående: 'https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg',
        },
        timeHour: 2,
        timeMin: 50,
        type: 'Action',
        age: 15,
        dates: '24 Sep',
        sceenTime: '19:30',
    },
}

const ages = ['6-12', '12-25', '25-65', 'Alla åldrar']

export default function StartPage() {
    return (
        <>
            <Container className="py-5">
                <Row className="px-4 justify-content-md-center text-center">
                    <Col lg={6} className="">
                        <h1 className="display-4 fw-bold">
                            Välkommen till <span className="text-primary">Filmvisarna</span>
                        </h1>
                        <p className="">
                            Upplev de senaste filmerna i världsklass, direkt från våra bekväma och moderna salonger. Hos
                            oss blir varje biobesök ett minne för livet. Hämta popcorn, luta dig tillbaka och låt filmen
                            börja!
                        </p>
                        <a className="btn btn-outline-primary" href="#book">
                            Boka film <BsFilm className="ms-2 align-baseline " />
                        </a>
                    </Col>
                </Row>
            </Container>
            <RenderMovies />
            <Container className="py-5" id="book">
                <h4 className="py-2 ps-2 bg-primary text-dark">Välj ett datum för bio </h4>
                <Dropdown className="py-2">
                    <Dropdown.Toggle className="btn-filter" variant="primary" id="dropdown-basic">
                        Vecka 7 <BsArrowDown />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Vecka 7</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Vecka 8</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Vecka 9</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Vecka 10</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Row className="g-2">
                    {new Array(7).fill(null).map((_, index) => (
                        <Col>
                            <Card className="border card-dates" key={index}>
                                <Card.Body>
                                    <Card.Title>Tisdag</Card.Title>
                                    <Badge className="py-2 d-inline-flex align-items-center " bg="secondary">
                                        <BsCalendar className="me-2" /> {movies.avengers.dates}
                                    </Badge>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container className="py-5">
                <h2>Lilla Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard ">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Card key={idx} className="border card-horizontal__scroll">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img variant="top" src={movies.avengers.poster.stående} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{movies.avengers.title}</Card.Title>
                                    <Card.Text>{movies.avengers.type}</Card.Text>
                                    <Badge className="py-1 d-inline-flex align-items-center " bg="secondary">
                                        <BsClock className="me-2" />
                                        {movies.avengers.sceenTime}
                                    </Badge>
                                    <Stack direction="horizontal" gap={3} className="mt-2">
                                        <Badge bg="none" className="border">
                                            {movies.avengers.timeHour} tim {movies.avengers.timeMin} min
                                        </Badge>

                                        <Badge bg="none" className="border">
                                            Från {movies.avengers.age} År
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
                    <div className="g-3 py-2 rowcard ">
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <Card key={idx} className="border card-horizontal__scroll  ">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img variant="top" src={movies.avengers.poster.stående} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{movies.avengers.title}</Card.Title>
                                    <Card.Text>{movies.avengers.type}</Card.Text>

                                    <Badge className="py-1 d-inline-flex align-items-center " bg="secondary">
                                        <BsClock className="me-2" />
                                        {movies.avengers.sceenTime}
                                    </Badge>
                                    <Stack direction="horizontal" gap={3} className="mt-2">
                                        <Badge bg="none" className="border">
                                            {movies.avengers.timeHour} tim {movies.avengers.timeMin} min
                                        </Badge>

                                        <Badge bg="none" className="border">
                                            Från {movies.avengers.age} År
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
