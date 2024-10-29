import { Container, Card, Badge, Stack, Row, Col } from 'react-bootstrap'
import useGetShows from '../../utils/api/shows/useGetShows'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsArrowDown, BsClock, BsCalendar } from 'react-icons/bs'
import { useState } from 'react'
import { formatTime } from '../../utils/timeFormat'

const MoviesWithCinnema = () => {
    const { data: shows, isLoading, error } = useGetShows()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedWeek, setSelectedWeek] = useState(0)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching shows</div>

    const lillaSalongenShows = shows?.filter((show) => show.cinemaName === 'Lilla salongen')
    console.log({ lillaSalongenShows })

    const storaSalongenShows = shows?.filter((show) => show.cinemaName === 'Stora salongen')
    console.log({ storaSalongenShows })

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
    }
    const currentWeek = getWeekInterval(selectedWeek)
    let weekNumber = formatTime(new Date().toString()).getWeekNumber

    return (
        <>
            <Container>
                <Dropdown className="py-2">
                    <Dropdown.Toggle className="btn-filter mb-3 mt-2" variant="primary" id="dropdown-basic">
                        Vecka {weekNumber}
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
                                            <BsCalendar className="me-2" /> {formattedDate.split(' ')[1]}
                                        </Badge>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            <Container className="py-5">
                <h2>Lilla Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {lillaSalongenShows &&
                            getShowsForDate(selectedDate, lillaSalongenShows)?.map((show) => (
                                <Card key={show.showId} className="border card-horizontal__scroll ">
                                    <div className="overflow-hidden rounded-bottom-0 rounded img-fluid w-100 h-75 fixed-image">
                                        <Card.Img
                                            variant="top"
                                            src={show.posterURL}
                                            alt={show.movieTitle}
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{show.movieTitle}</Card.Title>
                                        <Card.Text className="d-flex flex-wrap">{show.genre.join(' ')}</Card.Text>

                                        <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                            <BsClock className="me-2" />
                                            {new Date(show.showTime).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Badge>
                                        <Stack direction="horizontal" gap={3} className="mt-2">
                                            <Badge bg="none" className="border">
                                                {Math.floor(show.duration / 60)} tim {show.duration % 60} min
                                            </Badge>
                                            <Badge bg="none" className="border">
                                                Från {show.ageLimit} År
                                            </Badge>
                                        </Stack>
                                    </Card.Body>
                                    <a className="btn btn-outline-primary mx-2 mb-2" href={`/boka-film/${show.showId}`}>
                                        Boka
                                    </a>
                                </Card>
                            ))}
                        {lillaSalongenShows && getShowsForDate(selectedDate, lillaSalongenShows)?.length === 0 && (
                            <p className="bg-date-picker p-2 rounded ">
                                Inga filmer tillgängliga för det valda datumet
                            </p>
                        )}
                    </div>
                </div>
            </Container>

            <Container className="py-5">
                <h2>Stora Salongen</h2>
                <div className="horizontal-scrollable">
                    <div className="g-3 py-2 rowcard">
                        {storaSalongenShows &&
                            getShowsForDate(selectedDate, storaSalongenShows)?.map((show) => (
                                <Card key={show.showId} className="border card-horizontal__scroll">
                                    <div className="overflow-hidden rounded-bottom-0 rounded img-fluid w-100 h-75 fixed-image">
                                        <Card.Img
                                            variant="top"
                                            src={show.posterURL}
                                            alt={show.movieTitle}
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{show.movieTitle}</Card.Title>
                                        <Card.Text>{show.genre.join(' ')}</Card.Text>
                                        <Badge className="py-1 d-inline-flex align-items-center" bg="secondary">
                                            <BsClock className="me-2" />
                                            {new Date(show.showTime).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Badge>
                                        <Stack direction="horizontal" gap={3} className="mt-2">
                                            <Badge bg="none" className="border">
                                                {Math.floor(show.duration / 60)} tim {show.duration % 60} min
                                            </Badge>
                                            <Badge bg="none" className="border">
                                                Från {show.ageLimit} År
                                            </Badge>
                                        </Stack>
                                    </Card.Body>
                                    <a className="btn btn-outline-primary mx-2 mb-2" href={`/boka-film/${show.showId}`}>
                                        Boka
                                    </a>
                                </Card>
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
