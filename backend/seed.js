import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const db = new database(dbPath)

const createShows = `
CREATE TABLE IF NOT EXISTS shows (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    movieId INTEGER,
    time TEXT,
    cinemaId INTEGER
);
`
/*   FOREIGN KEY (movieId) REFERENCES movies(Id),
    FOREIGN KEY (cinemaId) REFERENCES cinemas(Id)*/

const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    showId INTEGER,
    bookingNumberId TEXT
);

`
/*  FOREIGN KEY (userId) REFERENCES users(Id),
    FOREIGN KEY (showId) REFERENCES shows(Id)*/

db.exec(createShows)
db.exec(createBookings)
