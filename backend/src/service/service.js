import betterSqlite from 'better-sqlite3'

const db = betterSqlite('../db/db.sqlite3')

const getMovies = () => {
    const stmt = db.prepare('SELECT * FROM movies').all()

    return stmt
}

export default { getMovies }
