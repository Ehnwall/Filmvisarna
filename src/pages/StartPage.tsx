import React, { useState } from 'react'
import { Container, Row, Col, Card, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsArrowDownCircle, BsClock, BsCalendar } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'

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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
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
        dates: '24/09',
        sceenTime: '19:30',
    },
}

const ages = ['6-12', '12-25', '25-65', 'Alla åldrar']

export default function StartPage() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                <Container>
                    <Navbar.Brand href="#home" className="text-primary">
                        Filmvisarna
                    </Navbar.Brand>
                    <Navbar.Toggle className="text-primary" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto text-primary">
                            <Nav.Link className="text-primary" href="#home">
                                Boka
                            </Nav.Link>
                            <Nav.Link className="text-primary" href="#link">
                                Medlem
                            </Nav.Link>
                            <Nav.Link className="text-primary" href="#">
                                Se filmer
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Carousel>
                <Carousel.Item interval={5000}>
                    <Image src={movies.shangchi.poster.liggande} />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <Image src={movies.interstellar.poster.liggande} />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <Image src={movies.avengers.poster.liggande} />
                </Carousel.Item>
            </Carousel>

            <Container className="py-4">
                <div className="d-flex justify-content-center">
                    <h1>Aktuella filmer</h1>
                </div>

                <Stack className="mb-2 mt-3" direction="horizontal" gap={3}>
                    <Dropdown>
                        <Dropdown.Toggle
                            className="btn-filter d-flex align-items-center"
                            variant="primary"
                            id="dropdown-basic"
                        >
                            Åldrar <BsArrowDown />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {ages.map((ages, index) => (
                                <Dropdown.Item href="/" key={index}>
                                    {ages}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className="btn-filter" variant="secondary">
                        Barn Filmer
                    </Button>
                </Stack>
                <Row xs={2} xl={4} className="g-2 gy-2">
                    {Object.values(movies).map((movie, idx) => (
                        <Col key={idx}>
                            <Card className="border">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img variant="top" src={movie.poster.stående} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.type}</Card.Text>
                                    <Stack direction="horizontal" gap={2} className="mx-auto card-badge ">
                                        <Badge bg="none" className="border">
                                            {movie.timeHour} tim {movie.timeMin} min
                                        </Badge>
                                        <Badge bg="none" className="border">
                                            Från {movie.age} År
                                        </Badge>
                                    </Stack>
                                </Card.Body>
                                <Card.Link className="stretched-link" href="#"></Card.Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container className="py-5">
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
                <h2>Salong nr 1</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard ">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div className="horizontal-card" key={idx}>
                                <Card style={{ width: '13rem' }} className="border card-horizontal__scroll">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img variant="top" src={movies.avengers.poster.stående} />
                                    </div>
                                    <Card.Body className="text-left">
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

                                    <Button className="mx-2 mb-2" variant="outline-primary">
                                        Boka
                                    </Button>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            <Container className="py-5">
                <h2>Salong nr 2</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard ">
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <div className="colcard" key={idx}>
                                <Card className="border card-horizontal__scroll ">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img variant="top" src={movies.avengers.poster.stående} />
                                    </div>
                                    <Card.Body className="text-left">
                                        <Card.Title>{movies.avengers.title}</Card.Title>
                                        <Card.Text>{movies.avengers.type}</Card.Text>

                                        <Badge className="py- d-inline-flex align-items-center " bg="secondary">
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
                                    <Button className="mx-2 mb-2" variant="outline-primary">
                                        Boka
                                    </Button>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}
