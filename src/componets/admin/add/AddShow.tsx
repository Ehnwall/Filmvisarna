import { useGetMovies } from '../../../utils/api/movies/useGetMovies'
import { Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { MOVIE, SHOWS } from '../../../utils/types/types'
import axios from 'axios'
import ShowCard from '../../../componets/startPage/ShowCard'

export default function AddShow() {
    const [movie, setMovie] = useState<MOVIE | null>(null)
    const [showTime, setshowTime] = useState<string>('')
    const [hall, setHall] = useState<string>('')
    const [show, setShow] = useState<SHOWS>()

    const { data: movies } = useGetMovies()

    const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMovie = movies?.find((movie) => movie.Id === parseInt(event.target.value))
        if (selectedMovie) {
            setShow({
                movieTitle: selectedMovie.title,
                genre: selectedMovie?.description.genre,
                posterURL: selectedMovie?.posterUrl,
                duration: selectedMovie?.durationMin,
                showId: 1,
            })
        }
        setMovie(selectedMovie || null)
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (movie && showTime && hall) {
            try {
                const newShow = {
                    movieId: movie.Id,
                    time: showTime,
                    cinemaID: hall,
                }
                const response = await axios.post('/api/shows', newShow)

                if (response.status === 201) {
                    setShow([...show, response.data])
                    setshowTime('')
                    setHall('1')
                    setMovie(null)
                }
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
                        <Form.Control
                            type="datetime-local"
                            value={showTime}
                            onChange={(e) => setshowTime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Salong för visning</Form.Label>
                        <Form.Select>
                            <option value="1">Stora salongen</option>
                            <option value="2">Lilla salongen</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Lägg till visning</Button>
                </Form>
            )}
            <div className="mt-4">
                <h3>Kommande visningar</h3>
            </div>
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
