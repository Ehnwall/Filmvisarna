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
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    movieID INTEGER,
    time TEXT,
    cinemaID INTEGER
);
`
/*   FOREIGN KEY (movieID) REFERENCES movies(ID),
    FOREIGN KEY (cinemaID) REFERENCES cinemas(ID)*/

const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER,
    showID INTEGER,
    booking_number TEXT
);

`
/*  FOREIGN KEY (userID) REFERENCES users(ID),
    FOREIGN KEY (showID) REFERENCES shows(ID)*/

db.exec(createShows)
db.exec(createBookings)
