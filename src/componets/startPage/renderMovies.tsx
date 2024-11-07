import { Container, Row, Col, Card, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import { IoMdArrowDropdown } from 'react-icons/io'
import { BsArrowDown } from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import { useGetMovies } from '../../utils/api/movies/useGetMovies'
import { useState } from 'react'
import MovieCard from './MovieCard'
import { motion, AnimatePresence } from 'framer-motion'

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
                            variant="outline-primary"
                            id="dropdown-basic"
                            className="btn-filter text-center"
                        >
                            {' '}
                            {selectedAge === '7' || selectedAge === '11' || selectedAge === '15'
                                ? `Från ${selectedAge}`
                                : selectedAge}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {ages.map((age) => (
                                <Dropdown.Item key={age} onClick={() => handleAgeSelect(age)}>
                                    {age === '7' || age === '11' || age === '15' ? `Från ${age}` : age}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Stack>

                <Row xs={2} md={4} xl={6} className="g-3">
                    <AnimatePresence>
                        {filteredMovies?.map((movie) => (
                            <motion.div
                                key={movie.Id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'backInOut' }}
                            >
                                <MovieCard movie={movie} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Row>
            </Container>
        </>
    )
}
