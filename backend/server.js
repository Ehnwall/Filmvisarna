import express from 'express'
import movieRouter from './src/router/moviesRoutes.js'
import cinemaRouter from './src/router/cinemasRoutes.js'
import betterSqlite from 'better-sqlite3'

export const db = betterSqlite('./backend/db/db.sqlite3')

const port = 4000
const app = express()

app.use(express.json())
app.use(movieRouter)
app.use(cinemaRouter)

app.listen(port, async () => {
    console.log(`Server is alive at http://localhost:${port}`)
})
