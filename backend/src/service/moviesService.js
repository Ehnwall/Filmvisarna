import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()

    return stmt
}

const getShowsByMovie = (id) => {
    const allShows = db.prepare('SELECT * FROM shows')

    try {
        const showByMovies = db.prepare(
            'SELECT movies.*, shows.id AS showId, shows.time  AS showTime, cinemas.name AS cinemaName, cinemas.id AS cinemaId FROM movies INNER JOIN shows ON shows.movieId = movies.id INNER JOIN cinemas ON cinemas.id = shows.cinemaId WHERE movies.Id = ?'
        )
        if (id > allShows.length) {
            throw new Error(
                `The movie ID exceeds the number of available shows. There are only ${allShows.length} shows.`
            )
        }
        const result = showByMovies.all(id)
        return result
    } catch (e) {
        console.error('Error finding Shows', e.message)
        return false
    }
}

export default { getMovies, getShowsByMovie }
