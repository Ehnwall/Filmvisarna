import jwtfilter from '../utils/jwtUtils.js'

const authourize = () => (req, res, next) => {
    const bearer = req.headers['authorization']
    try {
        if (!bearer) {
            res.status(400).send({ msg: 'Bad token' })
        }

        const token = jwtfilter.verify(bearer.split(' ')[1])
        req.user = token
    } catch (err) {
        if (err.name == 'JsonWebTokenError') {
            return res.status(400).send({ err: 'Invalid authorization signature' })
        } else if (err.name == 'TokenExpiredError') {
            return res.status(400).send({ err: 'Authorization token expired' })
        }
    }

    next()
}

export default { authourize }
