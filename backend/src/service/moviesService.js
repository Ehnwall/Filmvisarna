import { db } from '../../server.js'

const getMovies = () => {
    const stmt = db.prepare('SELECT * FROM movies').all()

    return stmt
}

export default { getMovies }
