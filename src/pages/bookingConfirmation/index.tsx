import { useGetBooking } from '../../utils/api/booking/useGetBooking'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import {
    BsCalendar,
    BsCreditCard2Back,
    BsGeoAlt,
    BsBuildingDown,
    BsCameraReels,
    BsArrowRightShort,
    BsPersonCircle,
    BsClock,
} from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { SEAT } from '@/utils/types/types'
import { formatTime, getDuration } from '../../utils/timeFormat'

const ConfirmationPage = () => {
    const { bookingNr } = useParams<{ bookingNr: string }>()
    const { data } = useGetBooking(bookingNr ?? '')
    const booking = Array.isArray(data) && data.length > 0 ? data[0] : null

    if (!booking) {
        return <div>No booking found.</div>
    }

    const totalPrice = booking.seats.reduce((total: number, seat: SEAT) => total + seat.ticketPrice, 0)

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

    const { hours, minutes } = getDuration(booking.durationMin)

    return (
        <Container className="mt-5 p-3 mb-1 bg-body-tertiary">
            <Card className="mb-6 text-center  bg-opacity-25">
                <Card.Body>
                    <Card.Title>
                        <h1>Din bokning är nu klar</h1>
                    </Card.Title>
                    <Card.Text>Du får en bokningsbekräftelse via e-post med information om din bokning.</Card.Text>
                    <Card.Text>
                        Ordernummer: {'  '} <span className="text-primary fs-5">{booking.bookingNumberId}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Row className="my-4">
                <Col md={6} className="d-flex justify-content-center p-5">
                    <div className="mt-5 text-center">
                        <div className="mt-4 d-flex align-items-center justify-content-left">
                            <BsCameraReels size={18} className="text-primary me-2" />
                            <h2>{booking.movieTitle}</h2>
                        </div>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center justify-content-left my-1">
                                <BsCalendar size={18} className="text-primary me-2" />
                                <span>{formatTime(booking.showTime).getWeekdayWithDate}</span>
                            </li>
                            <li className="d-flex align-items-center justify-content-left my-1">
                                <BsGeoAlt size={18} className="text-primary me-2" />
                                <span>{booking.cinemaName}</span>
                            </li>
                            <li className="d-flex align-items-center justify-content-left my-1">
                                <BsPersonCircle size={18} className="text-primary me-2" />
                                <span>{booking.seats.length} biljetter</span>
                            </li>
                            <li className="d-flex align-items-center justify-content-left my-1">
                                <BsClock size={18} className="text-primary me-2" />
                                <span>{formatTime(booking.showTime).getTime}</span>
                                <BsArrowRightShort size={18} className="text-primary mx-1" />
                                <span>
                                    {hours} tim {minutes} min
                                </span>
                            </li>

                            {Object.keys(groupedSeats).map((row) => (
                                <li key={row} className="d-flex align-items-center justify-content-left my-1">
                                    <BsBuildingDown size={18} className="text-primary me-2" />
                                    <span>Rad: {row}</span>
                                    <BsArrowRightShort size={18} className="text-primary mx-1" />
                                    {groupedSeats[parseInt(row)].map((seatNumber) => (
                                        <span key={seatNumber} className="badge bg-primary text-black  mx-1">
                                            {seatNumber}
                                        </span>
                                    ))}
                                </li>
                            ))}
                            <li className="pt-5 d-flex align-items-center justify-content-left">
                                <h6 className="d-flex align-items-center">
                                    <BsCreditCard2Back size={18} className="text-primary me-2" />
                                    <span>Totalt: {totalPrice} kr</span>
                                </h6>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={6} className="d-flex justify-content-center pt-4 ">
                    <Image
                        src={booking.movieUrl}
                        alt="Confirmed movie picture"
                        className="img-fluid w-100 w-md-25 p-3"
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default ConfirmationPage
