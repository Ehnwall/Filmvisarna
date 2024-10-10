import { db } from '../../server.js'

const getAllShows = () => {
    const allshows =
        'SELECT cinemas.name AS cinemaName, cinemas.Id AS cinemaId, shows.Id AS showId, shows.time AS showTime, movies.*  FROM shows INNER JOIN movies ON movieId = movies.id INNER JOIN cinemas ON shows.cinemaId = cinemas.id ORDER BY cinemas.name '
    const stmt = db.prepare(allshows).all()

    if (stmt.length === 0) {
        throw new Error({ msg: 'No shows found' })
    }
    return stmt
}

export default { getAllShows }
