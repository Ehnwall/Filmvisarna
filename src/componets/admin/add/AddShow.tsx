import { useGetMovies } from '../../../utils/api/movies/useGetMovies'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { MOVIE } from '../../../utils/types/types'

export default function AddShow() {
    const [movie, setMovie] = useState<MOVIE | null>(null)

    const { data: movies } = useGetMovies()
    const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMovie = movies?.find((movie) => movie.Id === parseInt(event.target.value))
        setMovie(selectedMovie || null)
    }
    return (
        <div>
            <h2>Lägg till en ny visning</h2>

            <Form.Select onChange={handleMovieChange}>
                <option>Välj en film</option>
                {movies?.map((movie) => (
                    <option key={movie.Id} value={movie.Id}>
                        {movie.title}
                    </option>
                ))}
            </Form.Select>
            {movie && (
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="mt-3">Tid för visning</Form.Label>
                        <Form.Control type="datetime-local" placeholder="name@example.com" />
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
        </div>
    )
}

//when(movie.?title) is clicked, the form should be displayed

//the form should contain the following fields:
// - date (input type date)
// - time (input type time)
// - submit button
// - cancel button
// - when the form is submitted, the show should be created in the database
// - when the cancel button is clicked, the form should be hidden
// - the form should be hidden by default
// - the form should be displayed when a movie is selected
// - the form should be hidden when the movie is unselected
// - the form should be hidden when the cancel button is clicked
// - the form should be hidden when the submit button is clicked
