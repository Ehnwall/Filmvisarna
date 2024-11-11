import { useGetMovies } from '../../../utils/api/movies/useGetMovies'
import { Form, Button, Card, Badge, Col, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { usePostShow } from '../../../utils/api/shows/usePostShows'
import { useMutation, useQuery } from 'react-query'
import { MOVIE, SHOWS } from '../../../utils/types/types'
import axios from 'axios'

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
        console.log('film', movie)
        console.log('visning', showTime, hall)
        console.log('salong', hall)
        event.preventDefault()
        if (movie && showTime && hall) {
            try {
                const newShow = {
                    movieId: movie.Id,
                    time: showTime,
                    cinemaId: hall,
                }
                addShow.mutate(newShow)
                // const response = await axios.post('/api/shows', newShow)

                // if (response.status === 201) {
                //     setShow([...show, response.data])
                //     setShowTime('')
                //     setHall(1)
                //     setMovie(null)
                // }
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

//När användaren klickar på "lägg till visning", så vill jag att den visningen läggs till i databasen (POST) och renderar ut den på sidan(preview)som ett card med tillhörande bagde för visningar

//jag behöver en onSubmit som sparar visningen
//jag behöver spara den i databasen
//jag behöver rendera ut den på sidan
//poster
// dag, tid och salong för visningen

// - when the form is submitted, the show should be created in the database
// - when the cancel button is clicked, the form should be hidden
// - the form should be hidden by default
// - the form should be displayed when a movie is selected
// - the form should be hidden when the movie is unselected
// - the form should be hidden when the cancel button is clicked
// - the form should be hidden when the submit button is clicked
