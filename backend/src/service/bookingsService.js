import { db } from '../../server.js'

export const deleteBookingById = (bookingId) => {
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

    return { message: 'Booking deleted successfully', bookingId }
}
