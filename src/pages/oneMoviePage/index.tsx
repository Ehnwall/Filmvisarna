import { Container, Row, Col } from 'react-bootstrap'
import {
    InfoMovieDescription,
    InfoMovieHeader,
    InfoMoviePoster,
    InfoMovieTrailer,
    Shows,
} from '../../componets/onemovie/index'
export default function IndividualMovie() {
    return (
        <>
            <Container className="pt-5">
                <InfoMovieHeader />
                <Row className="g-4">
                    <Col md={{ order: 'last' }} lg={3}>
                        <InfoMoviePoster />
                    </Col>
                    <Col lg={9}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <Shows />
                            </Col>
                            <Col xs={12}>
                                <InfoMovieDescription />
                            </Col>
                            <Col xs={12}>
                                <InfoMovieTrailer />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
