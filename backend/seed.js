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
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE IF NOT EXISTS cinemaSeats(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    cinemaId INTEGER NOT NULL,
    seatRow INTEGER NOT NULL,
    seatNumber INTEGER NOT NULL,
    FOREIGN KEY(cinemaId) REFERENCES cinemas(Id)
);
`

// Sätt in sittplatser
const insertCinemaSeatsQuery = `
INSERT INTO cinemaSeats (cinemaId, seatRow, seatNumber) VALUES (?, ?, ?)
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
const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT NOT NULL
    );
`

// const userQuery = `
//     INSERT INTO users (email, password, firstName, lastName, role) VALUES
//     ('eric.classon@example.com', 'hashedPassword1', 'Erik', 'Classon', 'admin'),
//     ('alvin.samuelsson@example.com', 'hashedPassword2', 'Alvin', 'Samuelsson', 'user'),
//     ('dennis.ehnwall@example.com', 'hashedPassword3', 'Dennis', 'Ehnwall', 'user'),
//     ('kalle.pettersson@example.com', 'hashedPassword4', 'Kalle', 'Pettersson', 'user'),
//     ('pontus.boman@example.com', 'hashedPassword5', 'Pontus', 'Boman', 'user');
// `

const createTicketTypeTable = `CREATE TABLE IF NOT EXISTS ticketTypes (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticketType TEXT NOT NULL,
        price INTEGER NOT NULL
    );`

// const ticketTypeQuery = `INSERT INTO ticketTypes (ticketType, price) VALUES ('Barn', 80 ), ('Vuxen',  140), ('Pensionär', 120)`

db.exec(createUserTable)
db.exec(createTicketTypeTable)
// db.exec(ticketTypeQuery)
// db.exec(userQuery)

db.close()
