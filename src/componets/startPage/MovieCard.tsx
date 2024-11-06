import { MOVIE } from '@/utils/types/types'
import { Badge, Card, Col, Stack } from 'react-bootstrap'
import { getDuration } from '../../utils/timeFormat'

export default function MovieCard({ movie }: { movie: MOVIE }) {
    const { hours, minutes } = getDuration(movie.durationMin)
    return (
        <Col>
            <Card>
                <div className="img-background rounded" style={{ backgroundImage: `url(${movie.posterUrl})` }}></div>
                <Card.Body className="p-0 pt-2 ">
                    <Card.Title className="fs-6 text-truncate">{movie.title}</Card.Title>
                    <Card.Text className="d-flex flex-wrap gap-2">
                        <Badge bg="primary" className="text-black">
                            {movie.description.genre[1]}
                        </Badge>
                    </Card.Text>
                    <Stack direction="horizontal" gap={2} className="flex-wrap card-badge">
                        <Badge bg="none" className="border">
                            {hours} tim {minutes} min
                        </Badge>

                        <Badge bg="none" className="border">
                            {Number(movie.ageLimit) === 0 ? 'Barnfilm' : `Från ${movie.ageLimit} År`}
                        </Badge>
                    </Stack>
                </Card.Body>
                <Card.Link className="stretched-link" href={`/film/${movie.Id}`}></Card.Link>
            </Card>
        </Col>
    )
}
