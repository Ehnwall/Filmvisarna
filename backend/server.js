import express from 'express'
import movieRouter from './src/router/moviesRoutes.js'
import authRouter from './src/router/authRoutes.js'
import showRouter from './src/router/showsRoutes.js'
import seatsRouter from './src/router/cinemasRoutes.js'
import betterSqlite from 'better-sqlite3'

export const db = betterSqlite('./backend/db/db.sqlite3')

const port = 4000
const app = express()

app.use(express.json())
app.use(movieRouter)
app.use(authRouter)
app.use(showRouter)
app.use(seatsRouter)

app.listen(port, async () => {
    console.log(`Server is alive at http://localhost:${port}`)
})
