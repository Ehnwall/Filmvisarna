import React from 'react'
import { Row } from 'react-bootstrap'

const ContactUs = () => {
    return (
        <Row style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Kontakta oss</h2>
            <p>Du kan nå oss via följande kontaktmetoder:</p>
            <ul className="list-unstyled">
                <li>Email: filmvisarna@gmail.com </li>
                <li>Telefon: 070-7403186</li>
                <li>Adress: Skolgatan 32, 831 44 Östersund</li>
            </ul>
            <p>Vi svarar vanligtvis inom 24 timmar.</p>
        </Row>
    )
}

export default ContactUs
