import { useState } from 'react'
import { Form, Col, Card } from 'react-bootstrap'

interface UserDetailsFormProps {
    email: string
    setEmail: (value: string) => void
    firstName: string
    setFirstName: (value: string) => void
    lastName: string
    setLastName: (value: string) => void
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
}) => {
    const [emailError, setEmailError] = useState<string | null>(null)
    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)

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
    return (
        <>
            <Card>
                <Card.Header>
                    <h3 className="mb-0 text.dark text-center">Ange dina uppgifter</h3>
                </Card.Header>
            </Card>
            <div className="d-flex flex-column align-items-center">
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
                    <Col md={4} key={label}>
                        <Form.Group className="mb-3">
                            <Form.Label>{label}</Form.Label>
                            <Form.Control
                                type={type}
                                placeholder={`Ange ditt ${label.toLowerCase()}`}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                onBlur={onBlur}
                                isInvalid={!!error}
                            />
                            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                        </Form.Group>
                    </Col>
                ))}
            </div>
        </>
    )
}

export default UserDetailsForm
