import React from 'react'

import { SHOWSONMOVIE } from '@/utils/types/types'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'
import { formatTime } from '../../utils/timeFormat'

export function Shows({ shows }: Readonly<{ shows: SHOWSONMOVIE }>) {
    return (
        <Card className="border-primary">
            <Card.Header className="bg-primary">
                <h2 className="h4 mb-0 text-dark">Visningar</h2>
            </Card.Header>
            <Card.Body className="p-0 pt-3">
                <Row className="g-3">
                    {shows?.slice(0, 6).map((show: SHOWSONMOVIE) => (
                        <Col key={show.showId} xs={12} sm={6} md={4}>
                            <Card className="h-100 border-1">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <BsCalendar size={18} className="text-primary me-2" />
                                            <span className="fw-bold me-2">{formatTime(show.showTime).getWeekDay}</span>
                                            <Badge bg="secondary">
                                                {formatTime(show.showTime).getShortNumericDate}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <BsClock size={18} className="text-primary me-2" />
                                        <span>{formatTime(show.showTime).getTime}</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <BsPin size={18} className="text-primary me-2" />
                                        <span>{show.cinemaName}</span>
                                    </div>
                                    <Card.Link
                                        className="btn btn-outline-primary mt-auto w-100"
                                        href={`/boka-film/${show.showId}`}
                                    >
                                        Boka
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    )
}
