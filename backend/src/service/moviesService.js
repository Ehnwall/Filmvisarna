import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()

    return stmt
}

const getMovieById = (id) => {
    try {
        const movieById = db.prepare('SELECT * FROM movies WHERE Id = ?')
        const result = movieById.get(id)
        return result
    } catch (error) {
        console.error('Error finding movie:', error)
        return false
    }
}

const getShowsByMovie = (id) => {
    try {
        const showByMovies = db.prepare(
            'SELECT movies.*, shows.*, cinemas.* FROM movies INNER JOIN shows ON shows.movieId = movies.id INNER JOIN cinemas ON cinemas.id = shows.id WHERE movies.Id = ?'
        )
        const result = showByMovies.get(id)
        return result
    } catch (error) {
        console.error('Error finding Shows')
        return false
    }
}

export default { getMovies, getMovieById, getShowsByMovie }
