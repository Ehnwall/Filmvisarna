import { db } from '../../server.js'

const getAllTickets = (id) => {
    const sql = `SELECT
    id,
    ticketType,
    price
    FROM ticketTypes `
    const stmt = db.prepare(sql).all()
    console.log(stmt)
    return stmt
}

export default { getAllTickets }
