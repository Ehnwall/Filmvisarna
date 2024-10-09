import { db } from '../../server.js'
const create = ({ email, firstName, lastName, password }) => {
    // console.log(email, firstName, lastName, password)
    const checkIfUserExists = 'SELECT * FROM users WHERE email = ?'
    const stmt = db.prepare(checkIfUserExists).get(email)
    if (stmt) {
        throw new Error('User already exists')
    }
}

export default { create }
