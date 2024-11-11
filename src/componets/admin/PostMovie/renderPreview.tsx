import React from 'react'
import { Container, Col, Card, Badge, Stack } from 'react-bootstrap'
import { getDuration } from '../../../utils/timeFormat'

interface RenderPreviewProps {
    movieTitle: string
    posterUrl: string
    durationMin: string
    ageLimit: string
    genreList: string[]
}

export default function renderPreview({ posterUrl, movieTitle, durationMin, ageLimit, genreList }: RenderPreviewProps) {
    let numberDurationMin = +durationMin
    const { hours, minutes } = getDuration(numberDurationMin)
    return (
        <>
            <h2 className="text-center">Movie preview</h2>
            <Col className="d-flex justify-content-center">
                <Card>
                    <img className="preview-card" src={posterUrl} style={{ width: '12rem' }} />
                    <Card.Body className="p-0 pt-2">
                        <Card.Title className="fs-6 text-truncate">{movieTitle}</Card.Title>
                        <Card.Text className="d-flex flex-wrap gap-2">
                            {genreList.map((genre) => (
                                <Badge bg="primary" className="text-black">
                                    {genre}
                                </Badge>
                            ))}
                        </Card.Text>
                        <Stack direction="horizontal" gap={2} className="flex-wrap card-badge">
                            <Badge bg="none" className="border">
                                {hours} tim {minutes} min
                            </Badge>
                            <Badge bg="none" className="border">
                                Från {ageLimit} År
                            </Badge>
                        </Stack>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
