import service from '../service/moviesService.js'

const getAllMovies = (req, res) => {
    const movies = service.getMovies()

    if (movies.length === 0) {
        return res.status(204).send({ msg: 'No movies' })
    }

    res.status(200).send(movies)
}

export default { getAllMovies }
