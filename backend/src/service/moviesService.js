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

const getShowsByMovie = (id, start, end) => {
    try {
        let shows
        let stmt
        if (start || end) {
            shows = `
            SELECT movies.Id AS movieId, shows.id AS showId, shows.time  AS showTime, cinemas.name AS cinemaName, cinemas.id AS cinemaId
            FROM movies
            INNER JOIN shows
            ON shows.movieId = movies.id
            INNER JOIN cinemas
            ON cinemas.id = shows.cinemaId
            WHERE movies.Id = ? AND shows.time BETWEEN datetime(?) AND datetime(?)
            `
            stmt = db.prepare(shows).all(id, start, end)
        } else {
            shows = `
            SELECT movies.Id AS movieId, shows.id AS showId, shows.time  AS showTime, cinemas.name AS cinemaName, cinemas.id AS cinemaId
            FROM movies
            INNER JOIN shows
            ON shows.movieId = movies.id
            INNER JOIN cinemas
            ON cinemas.id = shows.cinemaId
            WHERE movies.Id = ?
            `
            stmt = db.prepare(shows).all(id)
        }
        const result = stmt
        if (result.length === 0) {
            throw new Error('No show found on mov with id ' + id)
        }
        return result
    } catch (e) {
        if (e.message === 'No show found on mov with id ' + id) {
            throw e
        } else {
            throw new Error('Invalid date format')
        }
    }
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
const addMovie = ({ title, durationMin, ageLimit, description, trailerUrl, posterUrl }) => {
    const insertMovie = db.prepare(
        'INSERT INTO movies (title, durationMin, ageLimit, description, trailerUrl, posterUrl) VALUES (?, ?, ?, ?, ?, ?)'
    )
    const info = insertMovie.run(title, durationMin, ageLimit, JSON.stringify(description), trailerUrl, posterUrl)
    return { info, title }
}

export default { getMovies, getShowsByMovie, getMovieById, addMovie }
