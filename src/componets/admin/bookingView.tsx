import { USERBOOKING, SEAT } from '@/utils/types/types'
import { Card, Row, Col, Tab } from 'react-bootstrap'
import {
    BsBuildingDown,
    BsArrowRightShort,
    BsCreditCard2Back,
    BsEnvelope,
    BsFilePerson,
    BsCameraReels,
    BsCalendar,
} from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { formatTime } from '../../utils/timeFormat'

export default function BookingView({ data }: { data: USERBOOKING[] }) {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {data.map((booking) => (
                            <ListGroup.Item
                                key={booking.bookingId}
                                variant="dark"
                                action
                                href={`#${booking.bookingId}`}
                                className="d-flex justify-content-between align-items-center"
                            >
                                {booking.movieTitle}
                                <Badge className=" bg-transparent border text-primary">{booking.bookingNumberId}</Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        {data.map((booking) => (
                            <Tab.Pane eventKey={`#${booking.bookingId}`} key={booking.bookingId}>
                                <TabPaneItem data={booking} />
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
const TabPaneItem = ({ data }: { data: USERBOOKING }) => {
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
        <Card className="h-100 border mb-3 w-50">
            <Card.Body>
                <Card.Title>
                    <span className="text-primary">{data.bookingNumberId}</span>
                </Card.Title>
                <Row>
                    <Col>
                        <p>
                            <BsCameraReels size={18} className="text-primary me-2" />
                            {data.movieTitle}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            <BsBuildingDown size={18} className="text-primary me-2" />
                            {data.cinemaName}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            <BsCalendar size={18} className="text-primary me-2" />
                            {formatTime(data.showTime).getShortDate} {formatTime(data.showTime).getTime}
                        </p>
                    </Col>
                </Row>

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
    )
}
