import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container className="h-100" fluid>
            <Row className="h-100">
                <Col xs={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Container className="m-0 mt-4">{children}</Container>
                </Col>
            </Row>
        </Container>
    )
}
