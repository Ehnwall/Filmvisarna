import { db } from '../../server.js'
import mapBookings from '../utils/mapBookings.js'
import bookingNumber from '../utils/bookingNumber.js'

const getBookings = (email, role) => {
    let booking
    if (role === 'admin') {
        const query = `
        SELECT *
        FROM userBookings
    `
        booking = db.prepare(query).all()
    } else {
        const query = `
        SELECT *
        FROM userBookings
        WHERE userEmail = ?
    `
        booking = db.prepare(query).all(email)
    }

    return mapBookings(booking)
}

const getAllTickets = () => {
    const sql = `SELECT
    id,
    ticketType,
    price
    FROM ticketTypes `

    const stmt = db.prepare(sql).all()
    if (!stmt) {
        throw new Error('No tickets available')
    }
    return stmt
}

const getBookingFs = (bookingId) => {
    const getSpecificBooking = `
    SELECT *
        FROM userBookings
    WHERE
    bookingId = ?`

    const statement = db.prepare(getSpecificBooking).all(bookingId)
    if (statement.length === 0) {
        throw new Error('no booking found')
    }
    return mapBookings(statement)
}

const createBooking = (showId, seats, email) => {
    const checkShow = `
    SELECT * FROM shows
    WHERE Id = ?
    `
    const show = db.prepare(checkShow).get(showId)
    if (!show) {
        throw new Error(`No show avalible on id:${showId}`)
    }

    const checkSeats = `
    SELECT * FROM cinemaSeats
    WHERE Id = ?
    `

    seats.forEach((seat) => {
        if (!db.prepare(checkSeats).get(seat.seatId)) {
            throw new Error(`No seat avalible on id:${seat.seatId}`)
        }
    })

    const getUserId = `
    SELECT * FROM users
    WHERE email = ?
    `
    const userId = db.prepare(getUserId).get(email).Id

    const insertNewBooking = `
    INSERT INTO bookings (userId, showId, bookingNumberId) VALUES (?, ?, ?)
    `
    const bookingNr = bookingNumber.generateString(3, 3)
    const booking = db.prepare(insertNewBooking).run(userId, showId, bookingNr)

    const insertSeats = `
    INSERT INTO bookingXseatsXticket (bookingID, cinemaSeatsID, ticketTypeID) VALUES (?, ?, ?)
    `
    seats.forEach((seat) => {
        db.prepare(insertSeats).run(booking.lastInsertRowid, seat.seatId, seat.ticketTypeId)
    })

    return bookingNr
}

export default { getBookingFs, getAllTickets, getBookings, createBooking }
