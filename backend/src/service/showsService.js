import { db } from '../../server.js'

const getAllShows = () => {
    try {
        const allshows =
            'SELECT cinemas.name AS cinemaName, cinemas.Id AS cinemaId, shows.Id AS showId, shows.time AS showTime, movies.*  FROM shows INNER JOIN movies ON movieId = movies.id INNER JOIN cinemas ON shows.cinemaId = cinemas.id ORDER BY cinemas.name '
        const stmt = db.prepare(allshows).all()
        return stmt
    } catch (e) {
        throw new Error('Failed to get shows')
    }
}

export default { getAllShows }
