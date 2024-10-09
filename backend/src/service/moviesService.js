import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()

    return stmt
}

//Get Shows by
const getShowsByMovie = (id) => {
    try {
        const showByMovies = db.prepare(
            'SELECT movies.*, shows.id AS show_id, shows.time  AS show_time, cinemas.name FROM movies INNER JOIN shows ON shows.movieId = movies.id INNER JOIN cinemas ON cinemas.id = shows.cinemaId WHERE movies.Id = ?'
        )
        const result = showByMovies.all(id)
        return result
    } catch (error) {
        console.error('Error finding Shows')
        return false
    }
}

export default { getMovies, getShowsByMovie }
