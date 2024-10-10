import { db } from '../../server.js'

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

export default { getBookingFs }
