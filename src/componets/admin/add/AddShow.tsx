import { useGetMovies } from '../../../utils/api/movies/useGetMovies'
import { Form, Button, Card, Badge, Col, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { usePostShow } from '../../../utils/api/shows/usePostShows'
import { MOVIE, SHOWS } from '../../../utils/types/types'

export default function addShow() {
    const [movie, setMovie] = useState<MOVIE | null>(null)
    const [showTime, setShowTime] = useState<string>('')
    const [hall, setHall] = useState<number>()
    const [show, setShow] = useState<Partial<SHOWS>>()

    const { data: movies } = useGetMovies()
    const addShow = usePostShow()

    const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMovie = movies?.find((movie) => movie.Id === parseInt(event.target.value))
        if (selectedMovie) {
            setShow({
                movieTitle: selectedMovie.title,
                genre: selectedMovie?.description.genre,
                posterURL: selectedMovie?.posterUrl,
                duration: selectedMovie?.durationMin,
                ageLimit: selectedMovie.ageLimit,
            })
        }
        setMovie(selectedMovie || null)
    }

    const handleShowTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowTime(event.target.value)
    }

    const handleHallChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHall(parseInt(event.target.value))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (movie && showTime && hall) {
            try {
                const newShow = {
                    movieId: movie.Id,
                    time: showTime,
                    cinemaId: hall,
                }
                addShow.mutate(newShow)
            } catch (error) {
                console.error('Gick inte att lägga till visning', error)
            }
        }
    }

    return (
        <div>
            <h2>Lägg till en ny visning</h2>
            <Form.Select onChange={handleMovieChange} value={movie?.Id || ''}>
                <option>Välj en film</option>
                {movies?.map((movie) => (
                    <option key={movie.Id} value={movie.Id}>
                        {movie.title}
                    </option>
                ))}
            </Form.Select>
            {movie && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="mt-3">Tid för visning</Form.Label>
                        <Form.Control type="datetime-local" value={showTime} onChange={handleShowTimeChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Salong för visning</Form.Label>
                        <Form.Select value={hall} onChange={handleHallChange}>
                            <option value="1">Stora salongen</option>
                            <option value="2">Lilla salongen</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Lägg till visning</Button>
                </Form>
            )}
            {show && (
                <Col>
                    <Card className="">
                        <Card.Body>
                            <Card.Img className="rounded" src={show?.posterURL} style={{ width: '14rem' }} />
                            <Card.Title className="fs-5 text-truncate mt-3">{show.movieTitle}</Card.Title>
                            <Card.Text className="d-flex flex-wrap gap-2">
                                <span className="border badge bg-primary text-black">{show?.genre[1]}</span>
                            </Card.Text>
                            <Stack direction="horizontal" gap={1} className="flex-wrap card badge">
                                <Badge bg="none" className="border">
                                    {Math.floor(show?.duration / 60)} tim {show?.duration % 60} min
                                </Badge>
                                <Badge bg="none" className="border">
                                    Från {show.ageLimit} år
                                </Badge>
                                {showTime && (
                                    <Badge bg="primary text-black" className="me-2 border">
                                        {showTime.slice(0, 10)} {showTime.slice(11, 16)}
                                    </Badge>
                                )}
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </div>
    )
}
