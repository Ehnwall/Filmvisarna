const authourize = () => (req, res, next) => {
    const bearer = req.headers['authorization']

    console.log('hello world')
    console.log(bearer)
    next()
}

export default { authourize }
