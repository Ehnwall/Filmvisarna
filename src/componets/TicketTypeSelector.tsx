import { useState } from 'react'
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { BsCreditCard2Back } from 'react-icons/bs'

interface Ticket {
    ticketType: string
    price: number
}

interface Props {
    ticketType: Ticket[]
}

export default function TicketTypeSelector({ ticketType }: Props) {
    const [quantities, setQuantities] = useState<number[]>(ticketType.map(() => 0))

    const handleIncrease = (index: number) => {
        setQuantities((prev) => prev.map((qty, i) => (i === index ? qty + 1 : qty)))
    }

    const handleDecrease = (index: number) => {
        setQuantities((prev) => prev.map((qty, i) => (i === index && qty > 0 ? qty - 1 : qty)))
    }

    const total = ticketType.reduce((sum, ticket, index) => sum + ticket.price * quantities[index], 0)

    return (
        <div>
            <Card>
                <Card.Header className="bg-primary">
                    <h3 className="mb-0 text-dark">Antal Biljetter</h3>
                </Card.Header>
                <Card.Body xs={4}>
                    <Row className="g-0">
                        {ticketType.map((ticket, index) => (
                            <Col xs={12} lg={8} className="d-flex justify-content-left mb-3" key={ticket.ticketType}>
                                <div className="fw-bold" style={{ minWidth: '100px' }}>
                                    {ticket.ticketType}
                                </div>
                                <div className="text-center w-25">{ticket.price} kr</div>
                                <ButtonGroup className="btn-group-sm ms-5 d-flex">
                                    <Button variant="outline-primary px-3" onClick={() => handleDecrease(index)}>
                                        -
                                    </Button>
                                    <Button className="bg-body-tertiary pb-2" variant="outline-primary px-3">
                                        {quantities[index]}
                                    </Button>
                                    <Button variant="outline-primary px-3" onClick={() => handleIncrease(index)}>
                                        +
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        ))}
                        <div className="fw-bold" style={{ minWidth: '100px' }}>
                            <BsCreditCard2Back size={18} className="text-primary me-2" />
                            Total: {total} kr
                        </div>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
