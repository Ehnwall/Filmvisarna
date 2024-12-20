import service from '../service/moviesService.js'
import { movieSchema } from '../utils/schemas.js'

const getAllMovies = (req, res) => {
    const movies = service.getMovies()

    if (movies.length === 0) {
        return res.status(204).send({ msg: 'No movies' })
    }

    res.status(200).send(movies)
}

const getShowByMovieId = (req, res) => {
    const movieId = parseInt(req.params.id, 10)
    const { startDate, endDate } = req.query
    try {
        const start = startDate ? new Date(startDate).toISOString() : null
        const end = endDate ? new Date(endDate).toISOString() : null
        const show = service.getShowsByMovie(movieId, start, end)
        res.status(200).send(show)
    } catch (e) {
        res.status(404).send({ msg: 'No shows Found' })
    }
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
const addMovie = (req, res) => {
    try {
        movieSchema.parse(req.body)
    } catch (error) {
        return res.status(400).send({ msg: error.errors })
    }
    try {
        const movie = service.addMovie(req.body)
        res.status(201).send({ msg: 'Film tillagd', movieId: movie.info.lastInsertRowid, movieTitle: movie.title })
    } catch (error) {
        res.status(500).send({ msg: 'Misslyckades lägga till en film', error: error.message })
    }
}

export default { getAllMovies, getOneMovie, getShowByMovieId, addMovie }
