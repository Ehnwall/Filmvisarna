import service from '../service/moviesService.js'

const getAllMovies = (req, res) => {
    const movies = service.getMovies()

    if (movies.length === 0) {
        return res.status(204).send({ msg: 'No movies' })
    }

    res.status(200).send(movies)
}

const getShowByMovieId = (req, res) => {
    const movieId = parseInt(req.params.id, 10)
    try {
        const show = service.getShowsByMovie(movieId)
        res.status(200).send(show)
    } catch (e) {
        res.status(404).send({ msg: 'No shows Found' })
    }
}

export default { getAllMovies, getShowByMovieId }
