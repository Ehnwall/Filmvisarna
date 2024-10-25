import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { BsClock } from 'react-icons/bs'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'

export function InfoMovieHeader() {
    const { data: movie } = useGetOneMovie()

    function convertMinutesToHoursAndMinutes(minutes: any) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return {
            hours,
            minutes: remainingMinutes,
        }
    }

    let min = movie?.durationMin

    const time = convertMinutesToHoursAndMinutes(min)

    return (
        <div>
            <h1 className="display-4 mb-1">{movie?.title}</h1>
            <div className="d-flex align-items-center mb-3">
                <BsClock size={18} className="text-primary me-2" />
                <span>
                    {time.hours} tim {time.minutes} min
                </span>
                <span className="px-2">|</span>
                <span>Från {movie?.ageLimit} år</span>
            </div>
            <Row className="g-1">
                {movie?.description?.genre?.map((genre: string) => (
                    <Col xs="auto" key={genre}>
                        <Badge bg="primary" className="mb-4 fs-6 text-dark">
                            {genre}
                        </Badge>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
