import { USERBOOKING, SEAT } from '@/utils/types/types'
import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { BsBuildingDown, BsArrowRightShort, BsCreditCard2Back, BsEnvelope, BsFilePerson } from 'react-icons/bs'

export default function BookingView({ data }: Readonly<{ data: USERBOOKING }>) {
    const totalPrice = data.seats.reduce((total, seat) => total + seat.ticketPrice, 0)

    const groupSeatsByRow = (seats: SEAT[]) => {
        return seats.reduce((acc, seat) => {
            const { seatRow, seatNumber } = seat
            if (!acc[seatRow]) {
                acc[seatRow] = []
            }
            acc[seatRow].push(seatNumber)
            return acc
        }, {} as Record<number, number[]>)
    }

    const groupedSeats = groupSeatsByRow(data.seats)
    return (
        <div>
            <Card className="h-100 border mb-3 w-50">
                <Card.Body>
                    <Card.Title>
                        Bokningsnummer: <span className="text-primary">{data.bookingNumberId}</span>
                    </Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                {' '}
                                <p>
                                    <BsEnvelope size={18} className="text-primary me-2" /> {data.userEmail}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {' '}
                                <p>
                                    <BsFilePerson size={18} className="text-primary me-2" /> {data.userFirstname}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <ul className="list-unstyled m-0">
                                    {Object.keys(groupedSeats).map((row) => (
                                        <li key={row} className=" align-items-center mb-3 mb-md-0">
                                            <BsBuildingDown size={18} className="text-primary me-2" />
                                            <span>Rad: {row}</span>
                                            <BsArrowRightShort size={18} className="text-primary mx-1" />
                                            <div className="d-flex flex-wrap gap-2 mt-1 mx-4">
                                                {groupedSeats[parseInt(row)].map((seatNumber) => (
                                                    <span key={seatNumber} className="badge bg-primary text-black">
                                                        {seatNumber}
                                                    </span>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                        <div className="mt-2">
                            <BsCreditCard2Back size={18} className="text-primary me-2" />
                            <span>Totalpris: {totalPrice} kr</span>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
