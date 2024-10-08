import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const db = new database(dbPath)

// Skapa biografernas tabell
const cinemasTableQuery = `
CREATE TABLE IF NOT EXISTS cinemas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
`

// Lägg till biografer
const insertCinemasQuery = `
INSERT INTO cinemas(name) VALUES
('Stora salongen'),
('Lilla salongen');
`

// Skapa sittplatsernas tabell
const cinemaSeatsTableQuery = `
CREATE TABLE IF NOT EXISTS cinema_seats(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cinema_id INTEGER NOT NULL,
    seatRow INTEGER NOT NULL,
    seatNumber INTEGER NOT NULL,
    FOREIGN KEY(cinema_id) REFERENCES cinemas(id)
);
`

// Sätt in sittplatser
const insertCinemaSeatsQuery = `
INSERT INTO cinema_seats (cinema_id, seatRow, seatNumber) VALUES (?, ?, ?)
`

// Kör SQL-frågor för att skapa tabeller och sätta in biografer
db.exec(cinemasTableQuery)
db.exec(insertCinemasQuery)
db.exec(cinemaSeatsTableQuery)

// Funktion för att sätta in sittplatser för en viss biograf
function insertSeats(cinemaId, rowSizes) {
    const insert = db.prepare(insertCinemaSeatsQuery)
    const insertMany = db.transaction((rows) => {
        rows.forEach(function (row) {
            insert.run(row.cinemaId, row.rowIndex, row.seat)
        })
    })

    const rows = []
    let seatNumber = 1 // Global räknare för alla säten

    rowSizes.forEach((seatsInRow, rowIndex) => {
        for (let seat = 0; seat < seatsInRow; seat++) {
            // Skapa ett objekt för varje stol med global seatNumber
            rows.push({ cinemaId: cinemaId, rowIndex: rowIndex + 1, seat: seatNumber })
            seatNumber++ // Öka sätesnumret för nästa stol
        }
    })

    insertMany(rows)
}

// Stora salongen
const storaSalongenRowSizes = [8, 9, 10, 10, 10, 10, 12, 12]
insertSeats(1, storaSalongenRowSizes) // Biograf-ID 1 för Stora salongen

// Lilla salongen
const lillaSalongenRowSizes = [6, 8, 9, 10, 10, 12]
insertSeats(2, lillaSalongenRowSizes) // Biograf-ID 2 för Lilla salongen

console.log('Seat data inserted successfully.')
