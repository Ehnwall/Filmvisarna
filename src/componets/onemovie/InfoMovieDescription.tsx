import React from 'react'
import { Row, Col, Stack, Accordion } from 'react-bootstrap'
import { MOVIE } from '../../utils/types/types'

export function InfoMovieDescription({ movie }: Readonly<{ movie: MOVIE }>) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Läs mer om filmen</Accordion.Header>
                <Accordion.Body>
                    <Stack gap={3}>
                        <p>{movie?.description?.synopsis}</p>
                        <Row>
                            <Col sm={6} md={4}>
                                <h5>Regi</h5>
                                <p>{movie?.description?.director}</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Skådespelare</h5>
                                {movie?.description?.cast?.map((actor: string) => (
                                    <p key={actor}>{actor}</p>
                                ))}
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Originaltitel</h5>
                                <p>{movie?.description?.originalTitle}</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Språk</h5>
                                <p>{movie?.description?.language}</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Text</h5>
                                <p>{movie?.description?.text}</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Åldersgräns</h5>
                                <p>{Number(movie?.ageLimit) === 0 ? 'Barnfilm' : `Från ${movie?.ageLimit} år`} </p>
                            </Col>
                        </Row>
                    </Stack>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
