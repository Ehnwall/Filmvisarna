import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsArrowDownCircle, BsClock, BsCalendar } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'

const booking = {
    title: 'Avengers',
    timeHour: 2,
    timeMin: 15,
    type: 'Action',
    age: 15,
    dates: '24/09',
    sceenTime: '19:30',
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
                    <Image src="https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg" />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <Image src="https://www.wallpaperflare.com/static/912/656/60/interstellar-movie-movies-monochrome-movie-poster-wallpaper.jpg" />
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <Image src="https://pbs.twimg.com/media/D4pgj_BVUAAbCTd.jpg:large" />
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
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx}>
                            <Card className="border">
                                <div className="overflow-hidden rounded-bottom-0 rounded">
                                    <Card.Img
                                        variant="top"
                                        src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{booking.title}</Card.Title>
                                    <Card.Text>{booking.type}</Card.Text>
                                    <Stack>
                                        <p className="text-muted">
                                            {booking.timeHour} tim {booking.timeMin} min
                                        </p>
                                        <p className="text-muted">Från {booking.age} År</p>
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
                                        <BsCalendar className="me-2" /> {booking.dates}
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
                                <Card style={{ width: '15rem' }} className="border">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img
                                            variant="top"
                                            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                                        />
                                    </div>
                                    <Card.Body className="text-left">
                                        <Card.Title>{booking.title}</Card.Title>
                                        <Card.Text>{booking.type}</Card.Text>
                                        <Badge className="py-2 d-inline-flex align-items-center " bg="secondary">
                                            <BsClock className="me-2" />
                                            {booking.sceenTime}
                                        </Badge>
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
                                <Card style={{ width: '15rem' }} className="border ">
                                    <div className="overflow-hidden rounded-bottom-0 rounded">
                                        <Card.Img
                                            variant="top"
                                            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
                                        />
                                    </div>
                                    <Card.Body className="text-left">
                                        <Card.Title>{booking.title}</Card.Title>
                                        <Card.Text>{booking.type}</Card.Text>
                                        <Badge className="py-2 d-inline-flex align-items-center " bg="secondary">
                                            <BsClock className="me-2" />
                                            {booking.sceenTime}
                                        </Badge>
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
