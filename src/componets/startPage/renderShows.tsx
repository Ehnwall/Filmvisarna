import { Container, Card, Badge, Stack, Row, Col } from 'react-bootstrap'
import useGetShows from '../../utils/api/shows/useGetShows'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsClock, BsCalendar } from 'react-icons/bs'
import { useState } from 'react'
import { formatTime } from '../../utils/timeFormat'
import ShowCard from './ShowCard'

const MoviesWithCinnema = () => {
    const { data: shows, isLoading, error } = useGetShows()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedWeek, setSelectedWeek] = useState(0)
    const [weekSelect, setWeekSelect] = useState(formatTime(new Date().toString()).getWeekNumber)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching shows</div>

    const lillaSalongenShows = shows?.filter((show) => show.cinemaName === 'Lilla salongen')

    const storaSalongenShows = shows?.filter((show) => show.cinemaName === 'Stora salongen')

    const today = new Date()

    const isPastDay = (date: any) => {
        return date < today.setHours(0, 0, 0, 0)
    }

    const getWeekInterval = (weeksAhead: number) => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const dayDiff = (dayOfWeek + 6) % 7
        const startOfThisWeek = new Date(today.setDate(today.getDate() - dayDiff + weeksAhead * 7))

        const endOfThisWeek = new Date(startOfThisWeek)
        endOfThisWeek.setDate(startOfThisWeek.getDate() + 6)

        return { start: startOfThisWeek, end: endOfThisWeek }
    }

    const getShowsForDate = (date: any, shows: any[]) => {
        if (!date) return []
        return shows?.filter((show) => {
            const showDate = new Date(show.showTime)
            showDate.setHours(0, 0, 0, 0)
            date.setHours(0, 0, 0, 0)
            return showDate.getTime() === date.getTime()
        })
    }
    function disabledShowClass(...classes: (string | boolean | undefined)[]): string {
        return classes.filter(Boolean).join(' ')
    }

    const handleWeekSelect = (weeksAhead: number) => {
        setSelectedWeek(weeksAhead)
        setSelectedDate(new Date(getWeekInterval(weeksAhead).start))
        setWeekSelect(formatTime(new Date(getWeekInterval(weeksAhead).start).toString()).getWeekNumber)
    }
    const currentWeek = getWeekInterval(selectedWeek)
    let weekNumber = formatTime(new Date().toString()).getWeekNumber

    return (
        <>
            <Container>
                <Dropdown className="py-2" id="book">
                    <Dropdown.Toggle className="btn-filter mb-3 mt-2" variant="primary" id="dropdown-basic">
                        Vecka {weekSelect}
                        <BsArrowDown />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {[...Array(4)].map((_, weekIndex) => (
                            <Dropdown.Item key={weekIndex} onClick={() => handleWeekSelect(weekIndex)}>
                                Vecka {weekNumber++}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Row className="g-2">
                    {new Array(7).fill(null).map((_, index) => {
                        const dayOfWeek: any = new Date(currentWeek.start)
                        dayOfWeek.setDate(currentWeek.start.getDate() + index)

                        const options = { weekday: 'long', day: 'numeric', month: 'numeric' }
                        const formattedDate = dayOfWeek.toLocaleDateString('sv-SE', options)

                        const isPast = isPastDay(dayOfWeek)
                        const isSelected = selectedDate && selectedDate.toDateString() === dayOfWeek.toDateString()

                        return (
                            <Col key={index}>
                                <Card
                                    className={disabledShowClass(
                                        'border card-dates',
                                        isPast ? 'bg-date-picker text-muted no-hover' : 'hoverable',
                                        isSelected ? 'bg-primary text-white' : ''
                                    )}
                                    onClick={() => !isPast && setSelectedDate(dayOfWeek)}
                                    style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="text-capitalize">
                                            {formattedDate.split(' ')[0]}
                                        </Card.Title>
                                        <Badge className="py-2 d-inline-flex align-items-center p-3" bg="secondary">
                                            <BsCalendar className="me-2" /> {formatTime(dayOfWeek).getShortNumericDate}
                                        </Badge>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            <Container className="py-5 pb-2">
                <h2>Lilla Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {lillaSalongenShows &&
                            getShowsForDate(selectedDate, lillaSalongenShows)?.map((show) => (
                                <ShowCard key={show.showId} show={show} />
                            ))}
                        {lillaSalongenShows && getShowsForDate(selectedDate, lillaSalongenShows)?.length === 0 && (
                            <p className="bg-date-picker p-2 rounded ">
                                Inga filmer tillgängliga för det valda datumet
                            </p>
                        )}
                    </div>
                </div>
            </Container>

            <Container className="py-5 pt-2">
                <h2>Stora Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {storaSalongenShows &&
                            getShowsForDate(selectedDate, storaSalongenShows)?.map((show) => (
                                <ShowCard key={show.showId} show={show} />
                            ))}
                        {storaSalongenShows && getShowsForDate(selectedDate, storaSalongenShows)?.length === 0 && (
                            <p className="bg-date-picker p-2 rounded ">
                                Inga filmer tillgängliga för det valda datumet
                            </p>
                        )}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MoviesWithCinnema
