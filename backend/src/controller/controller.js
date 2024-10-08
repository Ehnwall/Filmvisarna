import service from '../service/service.js'

const getAllMovies = (req, res) => {
    const movies = service.getMovies()

    if (movies.length === 0) {
        return res.status(204).send({ msg: 'No movies' })
    }

    res.send(movies)
}

export default { getAllMovies }
