import { useAuth } from '../../context/authContext'
import { useState } from 'react'
import { Row, Container, Col, Form, Button } from 'react-bootstrap'

export default function Register() {
    const [error, setError] = useState('')
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', 'g')
    const { signUp, token } = useAuth()

    console.log(token)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const formData = new FormData(event.currentTarget)
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const repetedPassword = formData.get('repetedPassword') as string
        if (!firstName || !lastName || !email || !password || !repetedPassword) {
            setError('Fyll i alla fält')
            return
        }
        if (password !== repetedPassword) {
            setError('Lösenorden matchar inte')
            return
        }
        signUp?.mutate({ firstName, lastName, email, password })
    }
    const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            setError('')
            return
        }
        setError('')
        if (!passwordRegex.test(event.target.value)) {
            setError('Lösenordet måste innehålla minst 8 tecken, en stor bokstav, en liten bokstav och en siffra')
            return
        }
    }
    return (
        <Container className="vh-100">
            <Row className="d-flex justify-content-center align-items-center vh-100">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3">
                        <h2 className="text-center h1">Bli medlem</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>Förnamn</Form.Label>
                                <Form.Control
                                    className="p-2"
                                    name="firstName"
                                    type="text"
                                    placeholder="Ange din förnamn"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Efternamn</Form.Label>
                                <Form.Control
                                    className="p-2"
                                    name="lastName"
                                    type="text"
                                    placeholder="Ange ditt efternamn"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Fyll i din Mejl</Form.Label>
                                <Form.Control
                                    className="p-2"
                                    name="email"
                                    type="email"
                                    placeholder="Ange din e-postadress"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control
                                    className="p-2"
                                    name="password"
                                    type="password"
                                    placeholder="Ange Lösenord"
                                    onBlur={handlePasswordBlur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="repetedPassword">
                                <Form.Label id="repetedPasswordText">Upprepa Lösenord</Form.Label>
                                <Form.Control
                                    className="p-2"
                                    name="repetedPassword"
                                    type="password"
                                    placeholder="Upprepa Lösenord"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Button type="submit" variant="outline-primary">
                                        Bli medlem
                                    </Button>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <a className="btn btn-link" href="/logga-in">
                                        Logga in
                                    </a>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
