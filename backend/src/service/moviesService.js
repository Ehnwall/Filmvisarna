import { db } from '../../server.js'

const getMovies = () => {
    const allMovies = 'SELECT * FROM movies'
    const stmt = db.prepare(allMovies).all()

    return stmt
}

const getMovieById = (id) => {
    const movieById = db.prepare('SELECT * FROM movies WHERE Id = ?')
    const result = movieById.get(id)

    if (result.length === 0) {
        throw new Error({ msg: 'Movie not found' })
    }
    return result
}

export default { getMovies, getMovieById }
