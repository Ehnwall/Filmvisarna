import { db } from '../../server.js'
const getShowById = (id) => {
    const showById = `SELECT
    shows.Id AS showId,
    shows.time AS showTime,
    cinemas.Id AS cinemaId,
    cinemas.name AS cinemasName,
    movies.*
    FROM shows
    INNER JOIN movies ON shows.movieId = movies.Id
    INNER JOIN cinemas ON shows.cinemaId = cinemas.Id
    WHERE shows.Id = ?`

    const stmt = db.prepare(showById).get(id)
    if (!stmt) {
        throw new Error('Show not found')
    }
    return stmt
}

const getAllShows = () => {
    const allshows =
        'SELECT cinemas.name AS cinemaName, cinemas.Id AS cinemaId, shows.Id AS showId, shows.time AS showTime, movies.*  FROM shows INNER JOIN movies ON movieId = movies.id INNER JOIN cinemas ON shows.cinemaId = cinemas.id ORDER BY cinemas.name '
    const stmt = db.prepare(allshows).all()

    if (stmt.length === 0) {
        throw new Error({ msg: 'No shows found' })
    }
    return stmt
}

const getSeatStatus = (showId) => {
    const getBookedSeats = `
    SELECT * FROM bookings
    JOIN bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
    JOIN cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
    WHERE showId = ?
    `
    const occupiedSeatsStmt = db.prepare(getBookedSeats).all(showId)
    return occupiedSeatsStmt.map((seat) => seat.seatNumber)
}

export default { getAllShows, getSeatStatus, getShowById }
