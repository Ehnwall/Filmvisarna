import { Container, Row, Col, Card, Stack, Accordion, Badge } from 'react-bootstrap'
import Shows from '../../componets/onemovie/shows'
import { InfoMovieTrailer } from '../../componets/onemovie/InfoMovieTrailer'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'
import { InfoMovieDescription } from '../../componets/onemovie/InfoMovieDescription'
import { InfoMovieHeader } from '../../componets/onemovie/InfoMovieHeader'
import { InfoMoviePoster } from '../../componets/onemovie/InfoMoviePoster'

export default function IndividualMovie() {
    const { data: movie } = useGetOneMovie()

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
