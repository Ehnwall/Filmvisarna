import React from 'react'
import { useGetShowsOnMovie } from '../../utils/api/movies/useGetShowsOnMovie'
import { SHOWSONMOVIE } from '@/utils/types/types'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'

export function Shows() {
    const { data: shows } = useGetShowsOnMovie()
    const getWeekDay = (dateString: string) => {
        const weekDaysMap: { [key: string]: string } = {
            '0': 'Söndag',
            '1': 'Måndag',
            '2': 'Tisdag',
            '3': 'Onsdag',
            '4': 'Torsdag',
            '5': 'Fredag',
            '6': 'Lördag',
        }
        const newDate = new Date(dateString).getDay()
        const dayOfWeek = weekDaysMap[newDate]

        return dayOfWeek
    }

    const getTime = (getTime: string) => {
        const newTime = new Date(getTime).getHours()
        const newMin = new Date(getTime).getMinutes()
        const fullTime = `${newTime}:${newMin}`
        return fullTime
    }

    const getDate = (getDate: string) => {
        const date = new Date(getDate)
        const newMonth = (date.getMonth() + 1).toString().padStart(2, '0')
        const newDay = date.getDate().toString().padStart(2, '0')
        const fullDate = `${newMonth}/${newDay}`
        return fullDate
    }
    return (
        <Card className="border-primary">
            <Card.Header className="bg-primary">
                <h2 className="h4 mb-0 text-dark">Biljetter</h2>
            </Card.Header>
            <Card.Body className="p-0 pt-3">
                <Row className="g-3">
                    {shows?.slice(0, 7).map((show: SHOWSONMOVIE) => (
                        <Col key={show.showId} xs={12} sm={6} md={4}>
                            <Card className="h-100 border-1">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <BsCalendar size={18} className="text-primary me-2" />
                                            <span className="fw-bold me-2">{getWeekDay(show.showTime)}</span>
                                            <Badge bg="secondary">{getDate(show.showTime)}</Badge>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <BsClock size={18} className="text-primary me-2" />
                                        <span>{getTime(show.showTime)}</span>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <BsPin size={18} className="text-primary me-2" />
                                        <span>{show.cinemaName}</span>
                                    </div>
                                    <Card.Link
                                        className="btn btn-outline-primary mt-auto w-100"
                                        href="/boka-film/:showId"
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