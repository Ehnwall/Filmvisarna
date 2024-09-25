import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-primary text-black mt-5 p-5">
      <Container>
        <Row>
          <Col md={4} sm={12}>
            <h5>Om oss</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-black" href="https://github.com/Ehnwall/Filmvisarna" target="_blank">
                  Vårt företag
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12}>
            <h5>Kontakt</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-black" href="https://www.instagram.com/dennisehnwall/" target="_blank">
                  Kontakta oss
                </a>
              </li>
              <li className="mb-2">
                <a className="text-black" href="" target="_blank">
                  Kundservice
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12}>
            <h5>Sociala Medier</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="text-black" href="https://www.facebook.com/" target="_blank">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a className="text-black" href="https://www.instagram.com/" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
