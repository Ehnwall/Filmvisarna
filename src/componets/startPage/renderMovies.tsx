import { Container, Row, Col, Card } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import { useGetMovies } from '../../utils/api/movies/useGetMovies'
import { useState } from 'react'
import MovieCard from './MovieCard'

const convertDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    return { hours, minutes }
}

export default function RenderMovies() {
    const { data: movies, isLoading, isError } = useGetMovies()
    const ages = ['Barnfilmer', '7', '11', '15', 'Alla Filmer']
    const [selectedAge, setSelectedAge] = useState('Alla Filmer')

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
        if (selectedAge === 'Alla Filmer') {
            return true
        }
        if (selectedAge === 'Barnfilmer') {
            return parseInt(movie.ageLimit) === 0
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
                    <h6 className="textpy-1 d-inline-flex align-items-center mt-2 ms-1">
                        Ålder : <span className="ms-2">{selectedAge}</span>
                    </h6>
                </Stack>

                <Row xs={2} md={4} xl={6} className="g-3">
                    {filteredMovies?.map((movie) => (
                        <MovieCard key={movie.Id} movie={movie} />
                    ))}
                </Row>
            </Container>
        </>
    )
}
