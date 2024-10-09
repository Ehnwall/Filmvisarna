import { db } from '../../server.js'

const getShowById = (id) => {
    const showById = `SELECT
    movies.*,
    shows.*,
    cinemas.*
    FROM shows
    INNER JOIN movies ON shows.movieId = movies.Id
    INNER JOIN cinemas ON shows.cinemaId = cinemas.Id
    WHERE shows.Id = ?`

    const stmt = db.prepare(showById).get(id)
    console.log(stmt)
    return stmt
}
export default { getShowById }
