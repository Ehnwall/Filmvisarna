import { useEffect, useState } from 'react'
import { Card, Row, Col, ButtonGroup, Button, Stack } from 'react-bootstrap'
import { BsCreditCard2Back, BsPlus } from 'react-icons/bs'

interface Ticket {
    ticketType: string
    price: number
    Id: number
}

interface Props {
    ticketType: Ticket[]
}

export default function TicketTypeSelector({ ticketType }: Props) {
    // const ticketAmount = ticketType.map((ticket) => ({
    //     ticketId: ticket.Id,
    //     amount: 0,
    // }))

    // const [amount, setAmount] = useState(ticketAmount)

    // const handleIncrease = (ticketId: number) => {
    //     setAmount((prev) =>
    //         prev.map((ticket) => (ticket.ticketId === ticketId ? { ...ticket, amount: ticket.amount + 1 } : ticket))
    //     )
    // }
    // useEffect(() => {
    //     console.log('här är det nytt!', amount)
    // }, [amount])

    // const handleDecrease = (ticketId: number) => {
    //     setAmount((prev) =>
    //         prev.map((ticket) =>
    //             ticket.ticketId === ticketId && ticket.amount > 0 ? { ...ticket, amount: ticket.amount - 1 } : ticket
    //         )
    //     )
    // }

    // const total = amount.reduce((acc, ticket) => {
    //     const foundTicketType = ticketType.find((t) => t.Id === ticket.ticketId)
    //     return acc + (foundTicketType ? foundTicketType.price * ticket.amount : 0)
    // }, 0)

    return (
        // <div>
        //     <Card>
        //         <Card.Header className="bg-primary">
        //             <h3 className="mb-0 text-dark">Antal Biljetter</h3>
        //         </Card.Header>
        //         <Card.Body>
        //             <Stack gap={2}>
        //                 {ticketType.map((ticket, index) => (
        //                     <Row key={ticket.ticketType} className="">
        //                         <Col sm="2" xs="8" className="d-flex gap-1">
        //                             <div className="mb-2">{ticket.ticketType} </div>
        //                         </Col>
        //                         <Col sm="2" xs="4">
        //                             <div className="d-flex justify-content-center">{ticket.price} kr</div>
        //                         </Col>
        //                         <Col sm="3">
        //                             <ButtonGroup className="btn-group-sm d-flex mb-4">
        //                                 <Button
        //                                     className="btn-outline-primary px-3  btn-ticket-counter btn-ticket-counter-minus
        //                                     "
        //                                     variant="outline-primary"
        //                                     onClick={() => handleDecrease(ticket.Id)}
        //                                 >
        //                                     -
        //                                 </Button>
        //                                 <Button className="bg-body-tertiary pb-2" variant="outline-primary px-3">
        //                                     {
        //                                         amount.find(
        //                                             (ticketTypeChoosen) => ticketTypeChoosen.ticketId === ticket.Id
        //                                         )?.amount
        //                                     }
        //                                 </Button>
        //                                 <Button
        //                                     className="btn-outline-primary px-3  btn-ticket-counter
        //                                     "
        //                                     variant="outline-primary px-3"
        //                                     onClick={() => handleIncrease(ticket.Id)}
        //                                 >
        //                                     +
        //                                 </Button>
        //                             </ButtonGroup>
        //                         </Col>
        //                     </Row>
        //                 ))}
        //                 <div className="fw-bold" style={{ minWidth: '100px' }}>
        //                     <BsCreditCard2Back size={18} className="text-primary me-2" />
        //                     Total: {total} kr
        //                 </div>
        //             </Stack>
        //         </Card.Body>
        //     </Card>
        // </div>
    )
}
