import { Container, Row, Col, Card } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import { useGetMovies } from './useGetMovies'
import { useState } from 'react'

const convertDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    return { hours, minutes }
}

export default function RenderMovies() {
    const { data: movies, isLoading, isError } = useGetMovies()
    const ages = ['7', '11', '15', 'Alla åldrar']
    const [selectedAge, setSelectedAge] = useState('Alla åldrar')

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading movies...</div>
    }

    const handleAgeSelect = (age: string) => {
        setSelectedAge(age)
    }

    const filteredMovies = movies?.filter((movie) => {
        if (selectedAge === 'Alla åldrar') {
            return true
        }
        return parseInt(movie.ageLimit) === parseInt(selectedAge)
    })

    return (
        <>
            <Container className="py-4" id="movies">
                <div className="d-flex justify-content-center">
                    <h3>Aktuella filmer på bio</h3>
                </div>

                <Stack className="mb-2 mt-3" direction="horizontal" gap={3}>
                    <Dropdown>
                        <Dropdown.Toggle
                            className="btn-filter d-flex align-items-center"
                            variant="primary"
                            id="dropdown-basic"
                        >
                            Åldrar <BsArrowDown />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {ages.map((age, index) => (
                                <Dropdown.Item key={index} onClick={() => handleAgeSelect(age)}>
                                    {age}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <h6>Ålder: {selectedAge}</h6>
                </Stack>

                <Row xs={2} xl={4} className="g-2 gy-2">
                    {filteredMovies?.map((movie, idx) => {
                        const { hours, minutes } = convertDuration(movie.durationMin)
                        return (
                            <Col key={idx}>
                                <Card className="border h-100">
                                    <div className="overflow-hidden rounded-bottom-0 rounded h-100">
                                        <Card.Img variant="top" src={movie.posterUrl} className="h-100" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>{movie.description.genre}</Card.Text>
                                        <Stack direction="horizontal" gap={2} className="mx-auto card-badge">
                                            <Badge bg="none" className="border">
                                                {hours} tim {minutes} min
                                            </Badge>
                                            <Badge bg="none" className="border">
                                                Från {movie.ageLimit} År
                                            </Badge>
                                        </Stack>
                                    </Card.Body>
                                    <Card.Link className="stretched-link" href="/individual"></Card.Link>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}
