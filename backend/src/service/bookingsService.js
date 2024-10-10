import { db } from '../../server.js'

const getAllTickets = () => {
    const sql = `SELECT
    id,
    ticketType,
    price
    FROM ticketTypes `

    const stmt = db.prepare(sql).all()
    if (!stmt) {
        throw new Error('No tickets available')
    }
    return stmt
}

export default { getAllTickets }
