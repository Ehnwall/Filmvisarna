import { db } from '../../server.js'

export const getBookings = (email, role) => {
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
