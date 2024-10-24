import React from 'react'
import { useParams } from 'react-router-dom'
import ContactUs from './ContacUs'
import OurCompany from '../OurCompany'
import CustomerService from './CustomerService'
import { Container } from 'react-bootstrap'

const ContentFromFooter = () => {
    const { content } = useParams()

    const renderContent = () => {
        switch (content) {
            case 'kontakt':
                return <ContactUs />
            case 'foretag':
                return <OurCompany />
            case 'Kundservice':
                return <CustomerService />

            default:
                return <h2>Välkommen till vår startsida!</h2>
        }
    }

    return <Container className="text-center mt-5">{renderContent()}</Container>
}

export default ContentFromFooter
