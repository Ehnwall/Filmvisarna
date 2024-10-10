import { db } from '../../server.js'

const getSeatStatus = (showId, cinemaId) => {
    const SeatInfo = `
        SELECT 
            cinemaSeats.Id,
            cinemaSeats.seatRow,
            cinemaSeats.seatNumber
        FROM cinemaSeats
        INNER JOIN bookingXseatsXticket 
            ON cinemaSeats.Id = bookingXseatsXticket.cinemaSeatsID
        INNER JOIN bookings 
            ON bookingXseatsXticket.bookingID = bookings.Id 
            AND bookings.showId = ?
        WHERE cinemaSeats.cinemaId = ?;
    `
    const occupiedSeats = db.prepare(SeatInfo).all(showId, cinemaId)

    if (occupiedSeats.length === 0) {
        throw new Error('No occupied seats found')
    }
    return occupiedSeats
}

export default { getSeatStatus }
