import { db } from '../../server.js'

export const getBookingsByUserId = (userId) => {
    const query = `
        SELECT
            *
        FROM userBookings
        WHERE userId = ?;
    `

    const result = db.prepare(query).all(userId)

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
