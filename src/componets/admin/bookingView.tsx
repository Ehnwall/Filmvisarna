import { USERBOOKING } from '@/utils/types/types'
import React from 'react'
import { Card, Container, Row, Col, Form, InputGroup } from 'react-bootstrap'

export default function BookingView({ data }: { data: USERBOOKING }) {
    return (
        <div>
            <Card className="h-100 border mb-3 w-50">
                <Card.Body>
                    <Card.Title>Bokningsnummer: {data.bookingNumberId}</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                {' '}
                                <p>Email: {data.userEmail}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {' '}
                                <p>Namn: {data.userFirstname}</p>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
