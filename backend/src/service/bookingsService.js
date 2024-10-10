import { db } from '../../server.js'

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

    const result = booking

    const bookingsMap = {}

    result.forEach((booking) => {
        const bookingId = booking.bookingId
        if (bookingsMap[bookingId]) {
            bookingsMap[bookingId].seats.push({
                seatRow: parseInt(booking.seatRow, 10),
                seatNumber: parseInt(booking.seatNumber, 10),
                ticketType: booking.ticketType,
                ticketPrice: booking.ticketPrice,
            })
        } else {
            bookingsMap[bookingId] = {
                bookingId: bookingId,
                bookingNumberId: booking.bookingNumberId,
                userId: booking.userId,
                userEmail: booking.userEmail,
                userFirstname: booking.userFirstname,
                userLastname: booking.userLastname,
                showTime: booking.showTime,
                cinemaName: booking.cinemaName,
                movieTitle: booking.movieTitle,
                movieUrl: booking.moviePosterUrl,
                seats: [
                    {
                        seatRow: parseInt(booking.seatRow, 10),
                        seatNumber: parseInt(booking.seatNumber, 10),
                        ticketType: booking.ticketType,
                        ticketPrice: booking.ticketPrice,
                    },
                ],
            }
        }
    })

    return Object.values(bookingsMap)
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
    const getSpecificBooking = `SELECT 
  *
FROM 
  bookings
JOIN 
  shows ON bookings.showId = shows.Id
JOIN 
  movies ON shows.movieId = movies.Id
JOIN 
  cinemas ON shows.cinemaId = cinemas.Id
JOIN 
  bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
JOIN 
  cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
JOIN 
  ticketTypes ON bookingXseatsXticket.ticketTypeId = ticketTypes.Id
WHERE 
  bookings.Id = ?`

    const statement = db.prepare(getSpecificBooking).get(bookingId)
    return statement
}

export default { getBookingFs, getAllTickets, getBookings }
