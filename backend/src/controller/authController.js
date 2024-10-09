import authService from '../service/authService.js'

const signup = async (req, res) => {
    const { email, firstName, lastName, password } = req.body
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g')
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', 'g')

    if (!email || !firstName || !lastName || !password) {
        return res.status(400).send({ msg: 'All fields are required' })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).send({ msg: 'Invalid email' })
    }
    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .send({ msg: 'Password must contain at least 8 characters, one lowercase, one uppercase and one number' })
    }

    try {
        const result = await authService.create({ email, firstName, lastName, password })
        return res.status(201).send(result)
    } catch (e) {
        return res.status(400).send({ msg: e.message })
    }
}

export default { signup }
