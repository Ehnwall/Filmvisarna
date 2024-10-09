const signup = (req, res) => {
    res.status(201).send({ msg: 'User registered' })
}

export default { signup }
