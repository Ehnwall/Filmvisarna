import { Row, Stack, Container, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useAuth } from '../../context/authContext'
export default function Login() {
    const navigate = useNavigate()
    const { user, token, signIn } = useAuth()
    useEffect(() => {
        if (user || token) {
            navigate('/')
        }
    }, [user, token, navigate])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (signIn) {
            const formData = new FormData(event.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            signIn.mutate({ email, password })
        }
    }
    useEffect(() => {
        if (signIn && signIn.isSuccess) {
            navigate('/')
        }
    }, [signIn, navigate])
    return (
        <Container className="vh-100">
            <Row className="d-flex justify-content-center align-items-center vh-100">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3 ">
                        <h2 className="text-center h1">Logga in</h2>
                        {signIn && signIn.isError && <div className="alert alert-danger">Fel mejl eller lösenord</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Fyll i din Mejl</Form.Label>
                                <Form.Control
                                    name="email"
                                    className={`p-2 ${signIn && signIn.isError ? 'border-danger' : ''}`}
                                    type="email"
                                    placeholder="Ange din e-postadress"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control
                                    name="password"
                                    className={`p-2 ${signIn && signIn.isError ? 'border-danger' : ''}`}
                                    type="password"
                                    placeholder="Ange lösenord"
                                />
                            </Form.Group>
                            <Stack direction="horizontal">
                                <div>
                                    <Button variant="primary" type="submit">
                                        Logga in
                                        {signIn && signIn.isPending && (
                                            <Spinner className="ms-2" animation="border" size="sm" />
                                        )}
                                    </Button>
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
    )
}
