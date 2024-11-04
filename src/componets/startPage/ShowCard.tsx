import { SHOWS } from '@/utils/types/types'
import { Badge, Card, Stack } from 'react-bootstrap'
import { getDuration, formatTime } from '../../utils/timeFormat'
import { BsClock } from 'react-icons/bs'

export default function ShowCard({ show }: { show: SHOWS }) {
    const { hours, minutes } = getDuration(show.duration)
    return (
        <Card className="">
            <div className="img-background h-100" style={{ backgroundImage: `url(${show.posterURL})` }}></div>
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
                        Från {show.ageLimit} År
                    </Badge>
                </Stack>
            </Card.Body>
            <Card.Link className="stretched-link btn btn-outline-primary" href={`/boka-film/${show.showId}`}>
                Boka
            </Card.Link>
        </Card>
    )
}
// ;<Card key={show.showId} className="border card-horizontal__scroll ">
//     <div className="overflow-hidden rounded-bottom-0 rounded img-fluid w-100 h-75 fixed-imag">
//         <Card.Img variant="top" src={show.posterURL} alt={show.movieTitle} className="w-100 h-100" />
//     </div>
//     <Card.Body>
//         <Card.Title>{show.movieTitle}</Card.Title>
//         <Card.Text className="d-flex flex-wrap gap-2">
//             {show.genre.map((genre: string, index: any) => (
//                 <Badge key={index} bg="primary" className="text-black">
//                     {genre}
//                 </Badge>
//             ))}
//         </Card.Text>

//         <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
//             <BsClock className="me-2" />
//             {new Date(show.showTime).toLocaleTimeString('sv-SE', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//             })}
//         </Badge>
//         <Stack direction="horizontal" gap={3} className="mt-2">
//             <Badge bg="none" className="border">
//                 {Math.floor(show.duration / 60)} tim {show.duration % 60} min
//             </Badge>
//             <Badge bg="none" className="border">
//                 Från {show.ageLimit} År
//             </Badge>
//         </Stack>
//     </Card.Body>
//     <a className="btn btn-outline-primary mx-2 mb-2" href={`/boka-film/${show.showId}`}>
//         Boka
//     </a>
// </Card>
