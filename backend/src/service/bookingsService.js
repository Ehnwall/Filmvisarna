import { db } from '../../server.js'

const getTicketsById = (id) => {
    const sql = `SELECT * FROM ticketTypes WHERE Id = ?` // Korrekt sträng för SQL
    const stmt = db.prepare(sql).get(id) // Använder SQL-strängen korrekt
    console.log(stmt)
    return stmt
}

export default { getTicketsById }
