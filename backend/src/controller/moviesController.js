import service from '../service/moviesService.js'

const getAllMovies = (req, res) => {
    const movies = service.getMovies()

    if (movies.length === 0) {
        return res.status(204).send({ msg: 'No movies' })
    }

    res.status(200).send(movies)
}

const getOneMovie = (req, res) => {
    const movieId = parseInt(req.params.id, 10) // Hämtar id från URL Parametern, gör om det till en Integer
    try {
        const movie = service.getMovieById(movieId)
        res.status(200).send(movie)
    } catch (e) {
        res.status(404).send({ msg: 'Movie not found' })
    }
}

const getShowByMovieID = (req, res) => {
    const movieId = parseInt(req.params.id, 10)
    try {
        const show = service.getShowsByMovie(movieId)
        res.status(200).send(show)
    } catch (e) {
        res.status(404).send({ msg: 'No shows Found' })
    }
}

export default { getAllMovies, getOneMovie, getShowByMovieID }
