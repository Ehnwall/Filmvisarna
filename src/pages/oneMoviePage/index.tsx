import { Container, Row, Col } from 'react-bootstrap'
import {
    InfoMovieDescription,
    InfoMovieHeader,
    InfoMoviePoster,
    InfoMovieTrailer,
    Shows,
} from '../../componets/onemovie/Index'

import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'
import { useGetShowsOnMovie } from '../../utils/api/movies/useGetShowsOnMovie'

export default function IndividualMovie() {
    const { data: movie } = useGetOneMovie()
    const { data: shows } = useGetShowsOnMovie()

    return (
        <Container className="pt-5">
            {movie && <InfoMovieHeader movie={movie} />}
            <Row className="g-4">
                <Col md={{ order: 'last' }} lg={3}>
                    {movie && <InfoMoviePoster movie={movie} />}
                </Col>
                <Col lg={9}>
                    <Row className="gy-4">
                        <Col xs={12}>{shows && <Shows shows={shows} />}</Col>
                        <Col xs={12}>{movie && <InfoMovieDescription movie={movie} />}</Col>
                        <Col xs={12}>{movie && <InfoMovieTrailer movie={movie} />}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
