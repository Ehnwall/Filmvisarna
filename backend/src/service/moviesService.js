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

export default { getMovies, getMovieById }
