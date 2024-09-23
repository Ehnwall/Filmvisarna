import React from 'react'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'

const ConfirmationPage = () => {
  return (
    <Container className="mt-4 bg-body-tertiary">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Din bokning är nu klar</Card.Title>
          <Card.Text>Du får en bokningsbekäftelse på mailen med information om din bokning</Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col md={6}>
          <div>
            <h5>Details:</h5>
            <ul>
              <li>Order number: 123456</li>
              <li>Date: September 24, 2024</li>
              <li>Customer name: John Doe</li>
              <li>Shipping address: 1234 React Street</li>
              <li>Payment method: Credit Card</li>
              <li>Total amount: $250</li>
            </ul>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Image
            src="https://img.fruugo.com/product/7/41/14532417_max.jpg"
            rounded
            alt="Confirmation"
            style={{ width: '250px', height: '250px' }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12} className="d-flex justify-content-between">
          <Button variant="success">Continue Shopping</Button>
          <Button variant="primary">View Order</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ConfirmationPage
