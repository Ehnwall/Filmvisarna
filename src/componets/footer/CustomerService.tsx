import { Row } from 'react-bootstrap'

const CustomerService = () => {
    return (
        <Row style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Kundservice</h2>
            <p>Vi finns här för att hjälpa dig!</p>
            <p>Du kan nå vår kundservice via följande kontaktmetoder:</p>
            <ul className="list-unstyled">
                <li>Email: kundservice@filmvisarna.se</li>
                <li>Telefon: 070-1234567</li>
            </ul>
            <p>Öppettider: Måndag till Fredag, 09:00 - 17:00</p>
            <h4>Vanliga Frågor (FAQ)</h4>
            <ul className="list-unstyled">
                <li>
                    <strong>Fråga:</strong> Hur bokar jag biljetter?
                </li>
                <li>
                    <strong>Svar:</strong> Du kan boka biljetter direkt via vår hemsida.
                </li>
                <li>
                    <strong>Fråga:</strong> Kan jag få en återbetalning?
                </li>
                <li>
                    <strong>Svar:</strong> Återbetalningar hanteras enligt våra policyer, vänligen kontakta oss för mer
                    information.
                </li>
            </ul>
            <p>Vi värdesätter din feedback! Tveka inte att höra av dig om du har frågor eller förslag.</p>
        </Row>
    )
}

export default CustomerService
