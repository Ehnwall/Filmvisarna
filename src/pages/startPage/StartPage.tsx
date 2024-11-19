import { Container, Row, Col } from 'react-bootstrap'
import { BsFilm } from 'react-icons/bs'
import RenderMovies from '../../componets/startPage/renderMovies'
import MoviesWithCinnema from '../../componets/startPage/renderShows'

export default function StartPage() {
    return (
        <>
            <Container className="py-5">
                <Row className="px-4 justify-content-md-center text-center">
                    <Col lg={6} className="">
                        <h1 className="display-4 fw-bold">
                            Välkommen till <span className="text-primary">Filmvisarna</span>
                        </h1>
                        <p className="">
                            Upplev de senaste filmerna i världsklass, direkt från våra bekväma och moderna salonger. Hos
                            oss blir varje biobesök ett minne för livet. Hämta popcorn, luta dig tillbaka och låt filmen
                            börja!
                        </p>
                        <a className="btn btn-outline-primary" href="#book">
                            Boka film <BsFilm className="ms-2 align-baseline " />
                        </a>
                    </Col>
                </Row>
            </Container>
            <RenderMovies />
            <MoviesWithCinnema />
        </>
    )
}
