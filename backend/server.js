import express from 'express'
import movieRouter from './src/router/moviesRoutes.js'
import cinemaRouter from './src/router/cinemasRoutes.js'
import bookingRouter from './src/router/bookingsRoutes.js'
import showsRouter from './src/router/showsRoutes.js'
import authRouter from './src/router/authRoutes.js'
import betterSqlite from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const dbPath = path.join(__dirname, '/db/db.sqlite3')

export const db = betterSqlite(dbPath)

if (process.env.MODE === 'production' && !process.env.PORT) {
    console.log('Please set the PORT environment variable')
}

const port = process.env.PORT || 4000
const app = express()

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.json())

app.use(movieRouter)
app.use(cinemaRouter)
app.use(bookingRouter)
app.use(showsRouter)
app.use(authRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(port, async () => {
    if (process.env.MODE === 'production') {
        console.log(`Server is live at port ${port}`)
    } else {
        console.log(`Server is alive at http://localhost:${port}`)
    }
})
