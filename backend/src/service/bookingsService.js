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

const createBooking = (showId, seats, user) => {

    // Check if seats are already booked
    const getBookedSeats = `
    SELECT * FROM bookings
    JOIN bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
    JOIN cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
    WHERE showId = ?
    `
    const occupiedSeatsStmt = db.prepare(getBookedSeats).all(showId)

    if (occupiedSeatsStmt.length > 0) {
        occupiedSeatsStmt.forEach((occupiedSeat) => {
            seats.forEach((seat) => {
                if (occupiedSeat.cinemaSeatsID === seat.seatId) {
                    throw new Error(`Seat ${seat.seatId} is already booked`)
                }
            })
        })
    }

    // Check if show exists
    const checkShow = `
    SELECT * FROM shows
    WHERE Id = ?
    `
    const show = db.prepare(checkShow).get(showId)
    if (!show) {
        throw new Error(`No show avalible on id:${showId}`)
    }

    // Check if seats exists
    const checkSeats = `
    SELECT * FROM cinemaSeats
    WHERE Id = ?
    `
    seats.forEach((seat) => {
        if (!db.prepare(checkSeats).get(seat.seatId)) {
            throw new Error(`No seat avalible on id:${seat.seatId}`)
        }
    })

    // Create a guest user if user is not logged in
    if (user.firstName && user.lastName) {
        const insertUser = `
        INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, 'ThisMustBeChanged', ?, ?, 'guest')
        `
        try {
            db.prepare(insertUser).run(user.email.toLowerCase(), user.firstName, user.lastName)
        } catch (error) {}
    }

    // Get userId
    const getUserId = `
    SELECT * FROM users
    WHERE email = ?
    `
    const userId = db.prepare(getUserId).get(user.email.toLowerCase()).Id

    // Create booking
    const insertNewBooking = `
    INSERT INTO bookings (userId, showId, bookingNumberId) VALUES (?, ?, ?)
    `
    // Generate booking number
    const bookingNr = bookingNumber.generateString(3, 3)
    const booking = db.prepare(insertNewBooking).run(userId, showId, bookingNr)

    const insertSeats = `
    INSERT INTO bookingXseatsXticket (bookingID, cinemaSeatsID, ticketTypeID) VALUES (?, ?, ?)
    `
    seats.forEach((seat) => {
        db.prepare(insertSeats).run(booking.lastInsertRowid, seat.seatId, seat.ticketTypeId)
    })
    return booking
}

const deleteBookingById = (bookingId, email, role) => {
    const booking = db.prepare('SELECT * FROM bookings WHERE bookings.id = ?').get(bookingId)

    if (!booking) {
        throw new Error('Booking not found')
    }

    const bookingEmail = db
        .prepare('SELECT *, users.email  FROM bookings JOIN users ON bookings.userId = users.Id WHERE bookings.id = ?')
        .get(bookingId)

    if (role !== 'admin' && bookingEmail.email !== email) {
        throw new Error('You are not authorized to delete this booking')
    }

    const deleteSeatsAndTicketsQuery = `
        DELETE FROM bookingXseatsXticket
        WHERE bookingID = ?
    `

    const deleteBookingQuery = `
        DELETE FROM bookings
        WHERE Id = ?
    `
    db.transaction(() => {
        db.prepare(deleteSeatsAndTicketsQuery).run(bookingId)
        db.prepare(deleteBookingQuery).run(bookingId)
    })()

    return { bookingId }
}

export default { getBookingFs, getAllTickets, getBookings, createBooking, deleteBookingById }
