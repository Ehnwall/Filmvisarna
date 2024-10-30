import { Card } from 'react-bootstrap'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'

export function InfoMoviePoster() {
    const { data: movie } = useGetOneMovie()

    return (
        <Card>
            <img src={movie?.posterUrl} alt={movie?.title} />
        </Card>
    )
}
