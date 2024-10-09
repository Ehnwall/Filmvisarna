const register = (req, res) => {
    res.status(201).send({ msg: 'User registered' })
}

export default { register }
