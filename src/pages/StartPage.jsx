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
import { BsArrowDown } from 'react-icons/bs'

export default function StartPage() {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Filmvisarna</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Boka</Nav.Link>
              <Nav.Link href="#link">Medlem</Nav.Link>
              <Nav.Link href="#">Se filmer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel>
        <Carousel.Item interval={5000}>
          <Image src="https://wallpapers.com/images/hd/shang-chi-official-movie-poster-kgiycfo4zeh71c5c.jpg" fluid />
          <Carousel.Caption>
            <h3>Välkommen till FilmVisarna</h3>
            <Button variant="link">Se filmer nedan</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <Image
            src="https://www.wallpaperflare.com/static/912/656/60/interstellar-movie-movies-monochrome-movie-poster-wallpaper.jpg"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <Image src="https://pbs.twimg.com/media/D4pgj_BVUAAbCTd.jpg:large" fluid />
        </Carousel.Item>
      </Carousel>
      <Container className="g-4">
        <Container className="py-5">
          <Stack direction="horizontal" className="mb-2" gap={3}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Åldrar <BsArrowDown />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">6-12</Dropdown.Item>
                <Dropdown.Item href="#/action-2">12-25</Dropdown.Item>
                <Dropdown.Item href="#/action-3">25-65</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Alla åldrar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="secondary">Barn Filmer</Button>
          </Stack>
          <Row xs={2} xl={4} className="g-2 gy-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Col key={idx}>
                <Card className="border">
                  <div className="overflow-hidden rounded-bottom-0 rounded">
                    <Card.Img variant="top" src="https://img.fruugo.com/product/7/41/14532417_max.jpg" />
                  </div>
                  <Card.Body className="">
                    <Card.Title>Avengers</Card.Title>
                    <Card.Text>Action</Card.Text>
                  </Card.Body>
                  <Card.Link className="stretched-link" href="#"></Card.Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Stack gap={3} className="col-md-5 mx-auto text-center">
          <label htmlFor="">Välj ett datum du vill gå på bio</label>
          <div className="mx-auto">
            <input className="datepicker-input" type="date" name="" id="" value="2024-09-23" />
          </div>
        </Stack>
        <Container className="py-5">
          <h2>Salong nr 2</h2>
          <div className="horizontal-scrollable">
            <div xs={2} xl={4} className="g-2 gy-2 rowcard ">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div className="colcard" key={idx}>
                  <Card className="border ">
                    <div className="overflow-hidden rounded-bottom-0 rounded">
                      <Card.Img variant="top" src="https://img.fruugo.com/product/7/41/14532417_max.jpg" />
                    </div>
                    <Card.Body className="text-left">
                      <Card.Title>Avengers</Card.Title>
                      <Card.Text>Action</Card.Text>
                      <Card.Text>Tid: 19:30</Card.Text>
                      <Button variant="primary">Boka</Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Container>
    </>
  )
}
