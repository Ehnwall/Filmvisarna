import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()
    const parsedMovies = stmt.map((movie) => {
        try {
            movie.description = JSON.parse(movie.description)
        } catch (error) {
            console.error('Error parsing description:', error)
        }
        return movie
    })
    return parsedMovies
}

/*<3*/

const getShowsByMovie = (id) => {
    const showByMovies = db.prepare(
        'SELECT movies.*, shows.id AS showId, shows.time  AS showTime, cinemas.name AS cinemaName, cinemas.id AS cinemaId FROM movies INNER JOIN shows ON shows.movieId = movies.id INNER JOIN cinemas ON cinemas.id = shows.cinemaId WHERE movies.Id = ?'
    )
    const result = showByMovies.all(id)
    if (result.length === 0) {
        throw new Error('No show found on movie with id ' + id)
    }
    return result
}
const getMovieById = (id) => {
    const movieById = db.prepare('SELECT * FROM movies WHERE Id = ?')
    let result = movieById.get(id)
    result.description = JSON.parse(result.description)
    if (result.length === 0) {
        throw new Error({ msg: 'Movie not found' })
    }
    return result
}

export default { getMovies, getShowsByMovie, getMovieById }
