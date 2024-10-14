import jwt from 'jsonwebtoken'

const SUPER_SECRET = 'supersecretsecret'

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
