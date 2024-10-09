import { db } from '../../server.js'

const getBookingFs = (bookingId) => {
    const getSpecificBooking = 'SELECT * FROM bookings WHERE id = ?'
    const statement = db.prepare(getSpecificBooking).get(bookingId)

    return statement
}

export default { getBookingFs }
