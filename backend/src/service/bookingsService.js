import { db } from '../../server.js'

const getBookingFs = (bookingId) => {
    const getSpecificBooking = `
    SELECT 
      *
    FROM 
      bookings b
    JOIN 
      shows s ON b.showId = s.showId
    JOIN 
      movies m ON s.movieId = m.movieId
    JOIN 
      cinemas c ON s.cinemaId = c.cinemaId
    JOIN 
      bookingXtypesXSeats bs ON b.bookingId = bs.bookingId
    JOIN 
      ticketTypes tt ON bs.ticketTypeId = tt.ticketTypeId
    WHERE 
      b.bookingId = ?
`
    const statement = db.prepare(getSpecificBooking).get(bookingId)

    return statement
}

export default { getBookingFs }
