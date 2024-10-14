import { db } from '../../server.js'

const seatsByCinemaId = (id) => {
    const allSeats = `
    SELECT * FROM cinemaSeats 
    WHERE cinemaId = ?
    ORDER BY seatNumber ASC`
    const stmt = db.prepare(allSeats).all(id)
    if (stmt.length === 0) {
        throw new Error('No seats found on cinema with id ' + id)
    }
    return stmt
}

export default { seatsByCinemaId }
