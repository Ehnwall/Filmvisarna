import { Card } from 'react-bootstrap'
import { MOVIE } from '@/utils/types/types'
export function InfoMoviePoster({ movie }: Readonly<{ movie: MOVIE }>) {
    return (
        <Card>
            <img src={movie?.posterUrl} alt={movie?.title} />
        </Card>
    )
}
