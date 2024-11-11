import { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import {
    BsReceipt,
    BsCalendar,
    BsClock,
    BsPin,
    BsPersonCircle,
    BsBuildingDown,
    BsArrowRightShort,
    BsCreditCard2Back,
} from 'react-icons/bs'
import { USERBOOKING, SEAT } from '@/utils/types/types'
import { useDeleteBooking } from '../../utils/api/booking/useDeleteBookings'
import ModalForDeleteBooking from './modalForDeleteBooking'
import { formatTime } from '../../utils/timeFormat'

const MemberBookingCard = ({ booking, isCurrent }: { booking: USERBOOKING; isCurrent: boolean }) => {
    const totalPrice = booking.seats.reduce((total, seat) => total + seat.ticketPrice, 0)

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

    const groupedSeats = groupSeatsByRow(booking.seats)

    const deleteBookingMutation = useDeleteBooking()

    const [showModal, setShowModal] = useState(false)

    const handleDelete = () => {
        const id = booking.bookingId.toString().trim()
        deleteBookingMutation.mutate(id)
        setShowModal(false)
    }
    return (
        <Col key={booking.bookingId} xs={12} sm={12} md={6} lg={4} xxl={3} className="g-4">
            <Card className="border h-100">
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{booking.movieTitle}</Card.Title>
                    <Card.Text className="flex-grow-1">
                        <Row>
                            <Col xs={7} className="d-flex align-items-center">
                                <ul className="list-unstyled m-0 ">
                                    <li className="mb-1 mb-sm-4 mb-md-1">
                                        <BsReceipt size={18} className="text-primary me-2" />
                                        <span>{booking.bookingNumberId}</span>
                                    </li>
                                    <li className="mb-1 mb-sm-4 mb-md-1">
                                        <BsCalendar size={18} className="text-primary me-2" />
                                        <span>{formatTime(booking.showTime).getShortDate}</span>
                                    </li>
                                    <li className="mb-1 mb-sm-4 mb-md-1">
                                        <BsClock size={18} className="text-primary me-2" />
                                        <span>{formatTime(booking.showTime).getTime}</span>
                                    </li>
                                    <li className="mb-1 mb-1 mb-sm-4 mb-md-1">
                                        <BsPin size={18} className="text-primary me-2" />
                                        <span>{booking.cinemaName}</span>
                                    </li>
                                    <li className="mb-1 mb-sm-4 mb-md-1">
                                        <BsPersonCircle size={18} className="text-primary me-2" />
                                        <span>{booking.seats.length} biljetter</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={5} className="d-flex flex-column align-items-end">
                                <img className="img-fluid" src={booking.movieUrl} alt={booking.movieTitle} />
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
                    </Card.Text>
                    <div>
                        <BsCreditCard2Back size={18} className="text-primary me-2" />
                        <span>Totalpris: {totalPrice} kr</span>
                    </div>
                    {isCurrent && (
                        <div className="d-grid mt-4">
                            <Button className="mt-auto" variant="outline-danger" onClick={() => setShowModal(true)}>
                                Avboka
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
            <ModalForDeleteBooking show={showModal} onHide={() => setShowModal(false)} onConfirm={handleDelete} />
        </Col>
    )
}

export default MemberBookingCard
