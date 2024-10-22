import React, { useState } from 'react'
import { Row, Stack, Container, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'

interface LoginResponse {
    bearer: string
    msg?: string
}

export default function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post<LoginResponse>('/api/login', {
                email,
                password,
            })

            // Om inloggningen är lyckad, spara token i localStorage
            localStorage.setItem('token', response.data.bearer)
            // Navigera till medlemmens sida
            window.location.href = '/member'
        } catch (error) {
            // Hantera fel (t.ex. 400, 401)
            if (axios.isAxiosError(error) && error.response) {
                // Begäran gjord och server svarade med ett statuskod som inte är 2xx
                alert(error.response.data.msg || 'Inloggning misslyckades.')
            } else {
                // Begäran gjord men något gick fel med själva begäran
                console.error('Error:', error)
                alert('Ett fel inträffade vid inloggning.')
            }
        }
    }

    return (
        <>
            <Container className="vh-100">
                <Row className="d-flex justify-content-center align-items-center vh-100">
                    <Col xs={12} md={8} lg={6} xl={5}>
                        <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3 ">
                            <h2 className="text-center h1">Logga in</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Fyll i din Mejl</Form.Label>
                                    <Form.Control
                                        className="p-2"
                                        type="email"
                                        placeholder="Ange din e-postadress"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Lösenord</Form.Label>
                                    <Form.Control
                                        className="p-2"
                                        type="password"
                                        placeholder="Ange lösenord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Stack direction="horizontal">
                                    <div>
                                        <button className="btn btn-outline-primary" type="submit">
                                            Logga in
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-end ms-auto">
                                        <a className="btn btn-link p-0" href="/forgot-password">
                                            Glömt Lösenord?
                                        </a>
                                    </div>
                                </Stack>
                                <Row className="mt-3">
                                    <Col>
                                        <a className="btn btn-link p-0" href="/register">
                                            Ny här? Bli medlem
                                        </a>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
