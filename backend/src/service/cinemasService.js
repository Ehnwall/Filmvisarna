import { db } from '../../server.js'

const getSeatStatus = () => {
    const SeatInfo = `
        SELECT 
            cinemaSeats.Id,
            cinemaSeats.seatRow,
            cinemaSeats.seatNumber,
            CASE 
                WHEN bookings.Id IS NOT NULL THEN 'booked'
        LEFT JOIN bookings ON bookingXseatsXticket.bookingID = bookings.Id AND bookings.showId = ?
        WHERE cinemaSeats.cinemaId = ?;
    `
    const occupiedSeats = db.prepare(SeatInfo).all()

    if (occupiedSeats.length === 0) {
        throw new Error({ msg: 'No occupied seats seats found' })
    }
    return occupiedSeats
}

export default { getSeatStatus }
