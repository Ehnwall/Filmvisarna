import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()

    return stmt
}

/*<3*/

const getShowsByMovie = (id) => {
    const showByMovies = db.prepare(
        'SELECT movies.*, shows.id AS showId, shows.time  AS showTime, cinemas.name AS cinemaName, cinemas.id AS cinemaId FROM movies INNER JOIN shows ON shows.movieId = movies.id INNER JOIN cinemas ON cinemas.id = shows.cinemaId WHERE movies.Id = ?'
    )
    const result = showByMovies.all(id)
    if (result.length === 0) {
        throw new Error('No show found on mov with id ' + id)
    }
    return result
}
const getMovieById = (id) => {
    const movieById = db.prepare('SELECT * FROM movies WHERE Id = ?')
    const result = movieById.get(id)

    if (result.length === 0) {
        throw new Error({ msg: 'Movie not found' })
    }
    return result
}

export default { getMovies, getShowsByMovie, getMovieById }
