import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { BsClock } from 'react-icons/bs'
import { MOVIE } from '../../utils/types/types'
import { getDuration } from '../../utils/timeFormat'

export function InfoMovieHeader({ movie }: Readonly<{ movie: MOVIE }>) {
    const { hours, minutes } = getDuration(movie?.durationMin)
    return (
        <div>
            <h1 className="display-4 mb-1">{movie?.title}</h1>
            <div className="d-flex align-items-center mb-3">
                <BsClock size={18} className="text-primary me-2" />
                <span>
                    {hours} tim {minutes} min
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
