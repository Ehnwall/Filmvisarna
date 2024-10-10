import { db } from '../../server.js'
import mapBookings from '../utils/mapBookings.js'

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
    return mapBookings(statement)
}

export default { getBookingFs, getAllTickets, getBookings }
