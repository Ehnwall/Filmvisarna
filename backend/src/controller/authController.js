import authService from '../service/authService.js'
import validate from '../utils/validator.js'

const signup = async (req, res) => {
    const { email, firstName, lastName, password } = req.body

    try {
        validate.signupData({ email, firstName, lastName, password })
        const result = await authService.create({ email, firstName, lastName, password })
        return res.status(201).send(result)
    } catch (e) {
        return res.status(400).send({ msg: e.message })
    }
}

export default { signup }
