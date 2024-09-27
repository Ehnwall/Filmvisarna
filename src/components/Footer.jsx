import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-primary mt-5 p-5">
      <Container>
        <Row>
          <Col md={4} sm={12} className="pb-3">
            <h5>Om oss</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="btn btn-link p-0" href="https://github.com/Ehnwall/Filmvisarna" target="_blank">
                  Vårt företag
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12} className="pb-3">
            <h5>Kontakt</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="btn btn-link p-0" href="https://www.instagram.com/dennisehnwall/" target="_blank">
                  Kontakta oss
                </a>
              </li>
              <li className="mb-2">
                <a className="btn btn-link p-0" href="" target="_blank">
                  Kundservice
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12}>
            <h5>Sociala Medier</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a className="btn btn-link p-0" href="https://www.facebook.com/" target="_blank">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a className=" btn btn-link p-0" href="https://www.instagram.com/" target="_blank">
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
