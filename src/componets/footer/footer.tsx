import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-primary mt-5 py-5 ">
            <Container>
                <Row>
                    <Col md={4} sm={12} className="pb-3 d-flex flex-column align-items-md-center">
                        <div className="left">
                            <h5 className="text-white">Om oss</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <Link className="btn btn-link p-0" to="/innehall/foretag">
                                        Vårt företag
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={4} sm={12} className="pb-3 d-flex flex-column align-items-md-center ">
                        <div className="left">
                            <h5 className="text-white">Kontakt</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <Link className="btn btn-link p-0" to="/innehall/kontakt">
                                        Kontakta oss
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="btn btn-link p-0" to="/innehall/Kundservice">
                                        Kundservice
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={4} sm={12} className="pb-3 d-flex flex-column align-items-md-center">
                        <div className="left">
                            <h5 className="text-white">Sociala Medier</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a
                                        className="btn btn-link p-0"
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a
                                        className=" btn btn-link p-0"
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
