import { Container, Row, Col, Card, Stack, Accordion, Badge, Button, ButtonGroup } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'

export default function IndividualMovie() {
  return (
    <>
      <Container className="pt-5">
        <h1 className="display-4 mb-1">Joker</h1>
        <div className="d-flex align-items-center mb-3">
          <BsClock size={18} className="text-primary me-2" />
          <span>2 tim 2 min</span>
          <span className="px-2">|</span>
          <span>Från 15 år</span>
        </div>
        <Row className="g-1">
          <Col xs="auto">
            <Badge bg="primary" className="mb-4 fs-6 text-dark">
              Action
            </Badge>
          </Col>
          <Col xs="auto">
            <Badge bg="primary" className="mb-4 fs-6 text-dark">
              Crime film
            </Badge>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={{ order: 'last' }} lg={3}>
            <Card>
              <img
                src="https://i.pinimg.com/originals/fe/e7/ea/fee7eab62f787cf7bbd3aa3cce3ac833.jpg"
                alt="Joker Movie Poster"
              />
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
                                  <BsCalendar size={18} className="text-primary me-2" />
                                  <span className="fw-bold me-2">Tisdag </span>
                                  <Badge bg="secondary">{24 + index} Sep</Badge>
                                </div>
                              </div>
                              <div className="d-flex align-items-center mb-3">
                                <BsClock size={18} className="text-primary me-2" />
                                <span>17:30</span>
                              </div>
                              <div className="d-flex align-items-center mb-3">
                                <BsPin size={18} className="text-primary me-2" />
                                <span>Stora Salongen</span>
                              </div>
                              <Card.Link className="btn btn-outline-primary mt-auto w-100" href="/booking-page">
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
                        <p>
                          Arthur Fleck, en festclown och misslyckad ståuppkomiker, lever ett fattigt liv med sin sjuka
                          mor. Men när samhället stöter bort honom och stämplar honom som en galning, bestämmer han sig
                          för att omfamna ett liv av brott och kaos i Gotham City.
                        </p>
                        <Row>
                          <Col sm={6} md={4}>
                            <h5>Regi</h5>
                            <p>Todd Phillips</p>
                          </Col>
                          <Col sm={6} md={4}>
                            <h5>Skådespelare</h5>
                            <p>Joaquin Phoenix, Robert De Niro, Zazie Beetz</p>
                          </Col>
                          <Col sm={6} md={4}>
                            <h5>Originaltitel</h5>
                            <p>Joker</p>
                          </Col>
                          <Col sm={6} md={4}>
                            <h5>Originalspråk</h5>
                            <p>Engelska</p>
                          </Col>
                          <Col sm={12} md={8}>
                            <h5>Åldersgräns</h5>
                            <p>Från 15 år: Får ses på bio av barn som fyllt 11 år i sällskap av vuxen.</p>
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
                    src="https://www.youtube.com/embed/xy8aJw1vYHo"
                    title="Joker: Folie à Deux | Official Teaser Trailer"
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
