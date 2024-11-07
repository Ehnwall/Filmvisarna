import { useGetMovies } from '../../../utils/api/movies/useGetMovies'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { MOVIE } from '../../../utils/types/types'

export default function AddShow() {
    const [movie, setMovie] = useState<MOVIE | null>(null)

    const { data: movies } = useGetMovies()
    return (
        <div>
            <h2>hello from add-show</h2>
            <Dropdown as={ButtonGroup}>
                <Button variant="primary">{movie ? movie?.title : 'Välj en film'}</Button>
                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    {movies?.map((movie) => (
                        <Dropdown.Item key={movie.Id} onClick={() => setMovie(movie)}>
                            {movie.title}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
