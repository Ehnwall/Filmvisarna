import { db } from '../../server.js'

export const getBookingsByUserId = (userId) => {
    const query = `
            SELECT
            bookings.Id AS bookingId,
            bookings.bookingNumberId,
            bookings.userId,
            shows.time AS showTime,
            cinemas.name AS cinemaName,
            movies.title AS movieTitle,
            movies.posterUrl AS moviePosterUrl,
            ticketTypes.ticketType AS ticketType,
            ticketTypes.price AS ticketPrice,
            cinemaSeats.seatRow,
            cinemaSeats.seatNumber
        FROM bookings
        JOIN shows ON bookings.showId = shows.Id
        JOIN movies ON shows.movieId = movies.Id
        JOIN cinemas ON shows.cinemaId = cinemas.Id
        JOIN bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
        JOIN cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
        JOIN ticketTypes ON bookingXseatsXticket.ticketTypeID = ticketTypes.Id
        WHERE bookings.userId = ?
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
