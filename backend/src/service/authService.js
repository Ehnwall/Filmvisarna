import { db } from '../../server.js'
import bcrypt from 'bcryptjs'

const create = async ({ email, firstName, lastName, password, role = 'user' }) => {
    const checkIfUserExistsQuery = 'SELECT * FROM users WHERE email = ?'
    const insertUserQuery = 'INSERT INTO users (email, firstName, lastName, password, role) VALUES (?, ?, ?, ?, ?)'

    const stmt = db.prepare(checkIfUserExistsQuery).get(email.toLowerCase())
    if (stmt) {
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    const result = db.prepare(insertUserQuery).run(email.toLowerCase(), firstName, lastName, hash, role)
    return result
}

export default { create }
