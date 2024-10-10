import { db } from '../../server.js'
const getShowById = (id) => {
    const showById = `SELECT
    shows.Id AS showId,
    shows.time AS showTime,
    cinemas.Id AS cinemaId,
    cinemas.name AS cinemasName,
    movies.*
    FROM shows
    INNER JOIN movies ON shows.movieId = movies.Id
    INNER JOIN cinemas ON shows.cinemaId = cinemas.Id
    WHERE shows.Id = ?`

    const stmt = db.prepare(showById).get(id)
    if (!stmt) {
        throw new Error('Show not found')
    }
    return stmt
}
export default { getShowById }
