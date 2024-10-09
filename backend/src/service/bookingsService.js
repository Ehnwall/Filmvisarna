import { db } from '../../server.js'

const getBookingFs = (bookingId) => {
    const getSpecificBooking = `
    SELECT 
      *
    FROM 
      bookings b
    JOIN 
      shows s ON b.showId = s.Id
    JOIN 
      movies m ON s.movieId = m.Id
    JOIN 
      cinemas c ON s.cinemaId = c.Id
    JOIN 
      bookingXseatsXticket bs ON b.Id = bs.bookingID
      JOIN cinemaSeats ON bs.cinemaSeatsID = cinemaSeats.Id
    JOIN 
      ticketTypes tt ON bs.ticketTypeId = tt.Id
    WHERE 
      b.Id = ?
`

    /*
    I rename, for example, shows as s , tt for ticket tipes and bs for booking seats 
    */

    const statement = db.prepare(getSpecificBooking).get(bookingId)

    return statement
}

export default { getBookingFs }
