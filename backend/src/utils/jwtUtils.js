import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const SUPER_SECRET = process.env.jwtSecret

const generate = (claims) => {
    let options = {
        issuer: 'Filmvisarna',
        subject: 'Auth token for Filmvisarna api',
        expiresIn: '1h',
    }
    return jwt.sign(claims, SUPER_SECRET, options)
}
function verify(token) {
    return jwt.verify(token, SUPER_SECRET)
}

export default { generate, verify }
