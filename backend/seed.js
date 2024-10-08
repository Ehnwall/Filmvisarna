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

/* const bookingTestData = `
INSERT INTO bookings (userId, showId, bookingNumberId) VALUES
(1, 1, 'BN001'),
(2, 2, 'BN002'),
(3, 3, 'BN003'),
(4, 1, 'BN004'),
(5, 4, 'BN005');
`
const showTestData = `
INSERT INTO shows (movieId, time, cinemaId) VALUES
(1, '2024-10-08 15:30', 1),
(2, '2024-10-08 18:00', 2),
(1, '2024-10-09 20:00', 1),
(3, '2024-10-09 16:00', 3),
(2, '2024-10-10 19:30', 2);

` */

db.exec(createShows)
db.exec(createBookings)

/* db.exec(showTestData)
db.exec(bookingTestData) */
