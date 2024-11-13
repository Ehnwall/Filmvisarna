import { SHOWS } from '@/utils/types/types'
import { Badge, Card, Stack } from 'react-bootstrap'
import { getDuration, formatTime } from '../../utils/timeFormat'
import { BsClock } from 'react-icons/bs'

export default function ShowCard({ show }: { show: SHOWS }) {
    const { hours, minutes } = getDuration(show.duration)
    return (
        <Card className="">
            <div className="img-background h-100 rounded " style={{ backgroundImage: `url(${show.posterURL})` }}></div>
            <Card.Body className="p-0 pt-2">
                <Card.Title className="fs-6 text-truncate">{show.movieTitle}</Card.Title>
                <Card.Text className="d-flex mb-2 flex-wrap gap-2">
                    <Stack direction="horizontal" gap={2} className="flex-wrap card-badge">
                        <Badge bg="primary" className="text-black ">
                            {show.genre[1]}
                        </Badge>
                        <Badge bg="secondary">
                            <BsClock className="me-2" />
                            {formatTime(show.showTime).getTime}
                        </Badge>
                    </Stack>
                </Card.Text>

                <Stack direction="horizontal" gap={2} className="flex-wrap mb-2 card-badge">
                    <Badge bg="none" className="border">
                        {hours} tim {minutes} min
                    </Badge>
                    <Badge bg="none" className="border">
                        {show.ageLimit === 0 ? 'Barnfilm' : `Från ${show.ageLimit} År`}
                    </Badge>
                </Stack>
            </Card.Body>
            <Card.Link className="stretched-link btn btn-outline-primary" href={`/boka-film/${show.showId}`}>
                Boka
            </Card.Link>
        </Card>
    )
}
