import { db } from '../../server.js'
import bcrypt from 'bcryptjs'
import jwtUtils from '../utils/jwtUtils.js'

const exists = async ({ email, password }) => {
    const checkIfUserExistsQuery = 'SELECT * FROM users WHERE email = ?'
    const user = db.prepare(checkIfUserExistsQuery).get(email)
    if (!user) {
        throw new Error('User does not exists')
    }
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                reject(new Error(err.message))
            } else if (res) {
                const token = jwtUtils.generate({
                    email,
                    role: user.role,
                })
                console.log(token)
                resolve(token)
            } else {
                reject(new Error('Invalid password'))
            }
        })
    })
}

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

export default { create, exists }
