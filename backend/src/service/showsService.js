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

const getAllShows = (startDate, endDate) => {
    try {
        let shows
        let stmt
        if (startDate || endDate) {
            shows = `SELECT cinemas.name AS cinemaName, 
                cinemas.Id AS cinemaId, 
                shows.Id AS showId, 
                shows.time AS showTime, 
                movies.*  
                FROM shows 
                INNER JOIN movies ON movieId = movies.id 
                INNER JOIN cinemas ON shows.cinemaId = cinemas.id
                WHERE shows.time BETWEEN datetime(?) AND datetime(?)
                ORDER BY cinemas.name, shows.time`
            stmt = db.prepare(shows).all(startDate, endDate)
        } else {
            shows = `SELECT cinemas.name AS cinemaName, 
                cinemas.Id AS cinemaId, 
                shows.Id AS showId, 
                shows.time AS showTime, 
                movies.*  
                FROM shows 
                INNER JOIN movies ON movieId = movies.id 
                INNER JOIN cinemas ON shows.cinemaId = cinemas.id
                ORDER BY cinemas.name, shows.time`
            stmt = db.prepare(shows).all()
        }
        if (stmt.length === 0) {
            throw new Error('No shows found')
        }
        return stmt
    } catch (e) {
        if (e.message === 'No shows found') {
            throw e
        } else {
            throw new Error('Invalid date format')
        }
    }
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
