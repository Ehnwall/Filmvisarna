import { Container, Row, Col } from 'react-bootstrap'
import {
    InfoMovieDescription,
    InfoMovieHeader,
    InfoMoviePoster,
    InfoMovieTrailer,
    Shows,
} from '../../componets/onemovie/Index'

export default function IndividualMovie() {
    return (
        <>
            <Container className="pt-5">
                <InfoMovieHeader data={movie} />
                <Row className="g-4">
                    <Col md={{ order: 'last' }} lg={3}>
                        <InfoMoviePoster data={movie} />
                    </Col>
                    <Col lg={9}>
                        <Row className="gy-4">
                            <Col xs={12}>
                                <Shows />
                            </Col>
                            <Col xs={12}>
                                <InfoMovieDescription data={movie} />
                            </Col>
                            <Col xs={12}>
                                <InfoMovieTrailer data={movie} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
