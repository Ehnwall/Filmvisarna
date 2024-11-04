import { SHOWS } from '@/utils/types/types'
import { Card } from 'react-bootstrap'
import { BsCalendar, BsClock, BsPin } from 'react-icons/bs'
import { formatTime, getDuration } from '../../utils/timeFormat'

export function BookingInformation({ show }: { show: SHOWS }) {
    const { hours, minutes } = getDuration(show.duration)
    return (
        <Card>
            <Card.Header className="bg-primary ">
                <h1 className="mb-0 text-dark ">{show?.movieTitle}</h1>
            </Card.Header>
            <Card.Body>
                <div className="d-flex align-items-center py-1">
                    <BsCalendar size={18} className="text-primary me-2" />
                    <span className="me-2">{formatTime(show.showTime).getWeekdayWithDate}</span>
                </div>
                <div className="d-flex align-items-center py-1">
                    <BsClock size={18} className="text-primary me-2" />
                    <span className="me-2">{formatTime(show.showTime).getTime}</span>
                </div>
                <div className="d-flex align-items-center py-1">
                    <BsClock size={18} className="text-primary me-2" />
                    <span>
                        {hours} tim {minutes} min
                    </span>
                </div>
                <div className="d-flex align-items-center py-1">
                    <BsPin size={18} className="text-primary me-2" />
                    <span className="me-2">{show?.cinemaName}</span>
                </div>
            </Card.Body>
        </Card>
    )
}
