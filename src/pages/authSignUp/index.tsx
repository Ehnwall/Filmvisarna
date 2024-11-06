import { useAuth } from '../../context/authContext'
import { useEffect, useState } from 'react'
import { Row, Container, Col, Form, Button, Card } from 'react-bootstrap'

export default function Register() {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepetedPassword] = useState('')

    const [error, setError] = useState('')
    const [signUpError, setSignUpError] = useState('')

    const [emailError, setEmailError] = useState<string | null>(null)
    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)

    const { signUp } = useAuth()
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', 'g')

    const handleBlur = (field: string, value: string) => {
        switch (field) {
            case 'email':
                setEmailError(value.includes('@') ? null : 'Ogiltig e-postadress')
                break
            case 'firstName':
                setFirstNameError(value ? null : 'Förnamn får inte vara tomt')
                break
            case 'lastName':
                setLastNameError(value ? null : 'Efternamn får inte vara tomt')
                break
            default:
                break
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        if (!firstName || !lastName || !email || !password || !repeatedPassword) {
            setError('Fyll i alla fält')
            return
        }
        if (password !== repeatedPassword) {
            setError('Lösenorden matchar inte')
            return
        }
        signUp?.mutate({ firstName, lastName, email, password })
    }

    useEffect(() => {
        if (signUp?.isError) {
            setSignUpError(signUp.error.response?.data.msg as string)
        }
    }, [signUp?.isError, signUp?.error])
    return (
        <Container className="vh-100">
            <Row className="d-flex justify-content-center align-items-center vh-100">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <div className="p-md-5 p-4 bg-body-tertiary custom-box-shadow rounded-3">
                        <Card>
                            <Card.Header>
                                <h3 className="text-center h1">Bli medlem</h3>
                            </Card.Header>
                        </Card>
                        {(signUpError || error) && (
                            <ul className="alert alert-danger ps-4">
                                {signUpError && <li>{signUpError}</li>}
                                {error && <li>{error}</li>}
                            </ul>
                        )}
                        <Form onSubmit={handleSubmit}>
                            {[
                                {
                                    label: 'E-post',
                                    type: 'email',
                                    value: email,
                                    onChange: setEmail,
                                    onBlur: () => handleBlur('email', email),
                                    error: emailError,
                                },
                                {
                                    label: 'Förnamn',
                                    type: 'text',
                                    value: firstName,
                                    onChange: setFirstName,
                                    onBlur: () => handleBlur('firstName', firstName),
                                    error: firstNameError,
                                },
                                {
                                    label: 'Efternamn',
                                    type: 'text',
                                    value: lastName,
                                    onChange: setLastName,
                                    onBlur: () => handleBlur('lastName', lastName),
                                    error: lastNameError,
                                },
                            ].map(({ label, type, value, onChange, onBlur, error }) => (
                                <Form.Group className="mb-3" key={label}>
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control
                                        type={type}
                                        placeholder={`Ange ditt ${label.toLowerCase()}`}
                                        value={value}
                                        onChange={(e) => onChange(e.target.value)}
                                        onBlur={onBlur}
                                        isInvalid={!!error}
                                    />
                                    {error && <Form.Text className="invalid">{error}</Form.Text>}
                                </Form.Group>
                            ))}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ange Lösenord"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => {
                                        if (!passwordRegex.test(password)) {
                                            setError(
                                                'Lösenordet måste innehålla minst 8 tecken, en stor bokstav, en liten bokstav och en siffra'
                                            )
                                        }
                                    }}
                                    isInvalid={!!error}
                                />
                                {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="repeatedPassword">
                                <Form.Label>Upprepa Lösenord</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Upprepa Lösenord"
                                    value={repeatedPassword}
                                    onChange={(e) => setRepetedPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Row>
                                {' '}
                                <Col>
                                    {' '}
                                    <Button type="submit" variant="outline-primary">
                                        Bli medlem{' '}
                                    </Button>{' '}
                                </Col>{' '}
                                <Col className="d-flex justify-content-end">
                                    {' '}
                                    <a className="btn btn-link" href="/logga-in">
                                        Logga in{' '}
                                    </a>{' '}
                                </Col>{' '}
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
