import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import { Description } from '../../utils/types/types'

type movie = {
    Id: number
    title: string
    durationMin: number
    ageLimit: string
    description: Description[]
    trailerUrl: string
    posterUrl: string
}

export default function PostMovies() {
    // const navigate = useNavigate()
    // const { token } = useAuth()
    // useEffect(() => {
    //     if (!token) {
    //         navigate('/logga-in')
    //     }
    // }, [token, navigate])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const movieTitle = formData.get('movieTitle') as string
        const ageLimit = formData.get('ageLimit') as string
        const director = formData.get('director') as string
        const language = formData.get('language') as string
        const durationMin = formData.get('durationMin') as string

        const description: Description[] = [
            {
                director,
                cast,
                synopsis,
                genre,
                text,
                language,
                originalTitle,
                year,
            },
        ]

        const data = { movieTitle, ageLimit, durationMin, description }

        console.log(data)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicMovieTitle">
                            <Form.Label>Film title</Form.Label>
                            <Form.Control type="text" placeholder="Lägg till film title" name="movieTitle" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicAgeLimit">
                            <Form.Label>Ådersgräns</Form.Label>
                            <Form.Control type="Number" placeholder="lägg till åldersgräns" name="ageLimit" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDurationMin">
                            <Form.Label>Längd i minuter</Form.Label>
                            <Form.Control type="Number" placeholder="Längd på film" name="durationMin" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDirector">
                            <Form.Label>Lägg till director</Form.Label>
                            <Form.Control type="text" placeholder="Lägg till director" name="director" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLanguage">
                            <Form.Label>Lägg till språk</Form.Label>
                            <Form.Control type="text" placeholder="Lägg till språk" name="language" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
