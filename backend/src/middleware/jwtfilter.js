import jwtfilter from '../utils/jwtUtils.js'

const authourize = (allowedRoles) => (req, res, next) => {
    const bearer = req.headers['authorization']
    if (!bearer && !allowedRoles.includes('guest')) {
        res.status(400).send({ msg: 'Bad token' })
    }

    if (bearer) {
        try {
            const token = jwtfilter.verify(bearer.split(' ')[1])
            req.user = token
            if (!allowedRoles.includes(token.role)) {
                return res.status(403).send({ msg: 'Forbidden' })
            }
        } catch (err) {
            if (err.name == 'JsonWebTokenError') {
                return res.status(400).send({ err: 'Invalid authorization signature' })
            } else if (err.name == 'TokenExpiredError') {
                return res.status(400).send({ err: 'Authorization token expired' })
            }
            return res.status(500).json({ error: 'Internal server error' })
        }
    } else if (allowedRoles.includes('guest')) {
        req.user = { role: 'guest' }
    }

    next()
}

export default { authourize }
