import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function StartPage() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Filmvisarna</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/BookingPage">Boka</Nav.Link>
              <Nav.Link href="#link">Medlem</Nav.Link>
              <Nav.Link href="#">Se filmer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Row xs={2} xl={4} className="g-2 gy-2">
          {Array.from({ length: 4 }).map((_, idx) => (
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
    </>
  )
}
