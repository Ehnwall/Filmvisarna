import { db } from '../../server.js'

const getSeatStatus = (showId) => {
    console.log(showId)
    const getBookedSeats = `
    SELECT * FROM bookings
    JOIN bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
    JOIN cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
    WHERE showId = ?
    `
    const occupiedSeatsStmt = db.prepare(getBookedSeats).all(showId)
    return occupiedSeatsStmt.map((seat) => seat.seatNumber)
}

export default { getSeatStatus }
