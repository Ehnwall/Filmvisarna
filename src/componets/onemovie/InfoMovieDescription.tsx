import React from 'react'
import { Row, Col, Stack, Accordion } from 'react-bootstrap'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'

export function InfoMovieDescription() {
    const { data: movie } = useGetOneMovie()
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
                                {movie?.description?.cast?.map((actor: string, index: number) => (
                                    <p key={index}>{actor}</p>
                                ))}
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Originaltitel</h5>
                                <p>{movie?.title}</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <h5>Originalspråk</h5>
                                {movie?.description?.language?.map((lang: string, index: number) => (
                                    <p key={index}>{lang}</p>
                                ))}
                            </Col>
                            <Col sm={12} md={8}>
                                <h5>Åldersgräns</h5>
                                <p>Från {movie?.ageLimit} år</p>
                            </Col>
                        </Row>
                    </Stack>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
