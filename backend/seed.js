import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}
const db = new database(dbPath)

const moviesTableQuery = `CREATE TABLE IF NOT EXISTS movies
(Id INTEGER PRIMARY KEY AUTOINCREMENT, 
title TEXT NOT NULL,
durationMin INTEGER NOT NULL,
ageLimit INTEGER NOT NULL, 
description TEXT NOT NULL, 
trailerUrl TEXT NOT NULL, 
posterUrl TEXT NOT NULL );`

// CREATE TABLES
db.exec(moviesTableQuery)

const movies = [
    {
        title: 'Nyckeln till frihet',
        durationMin: 142,
        ageLimit: 15,
        description: {
            director: 'Frank Darabont',
            cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
            synopsis:
                'En bankman som dömts för uxoricid (hustrumord) utvecklar en vänskap under ett kvarts sekel med en härdad medfånge, samtidigt som han håller fast vid sin oskuld och försöker behålla hoppet genom enkel medkänsla.',
            genre: ['Drama', 'Tragedi'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            year: 1994,
        },

        posterUrl: 'https://d2iltjk184xms5.cloudfront.net/uploads/photo/file/64157/small_original.jpg',
        trailerUrl: 'P9mwtI82k6E',
    },
    {
        title: 'Gudfadern',
        durationMin: 175,
        ageLimit: 15,
        description: {
            director: 'Francis Ford Coppola',
            cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Richard S. Castellano'],
            synopsis:
                'Den åldrande patriarken för en organiserad brottslig dynasti överlämnar kontrollen över sitt hemliga imperium till sin motvillige son.',
            genre: ['Drama', 'Gangster', 'brottslighet'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            year: 1972,
        },
        posterUrl: 'https://images.photowall.com/products/59598/godfather.jpg?h=699&q=85',
        trailerUrl: 'UaVTIH8mujA',
    },
    {
        title: 'The Dark Knight',
        durationMin: 152,
        ageLimit: 15,
        description: {
            director: 'Christopher Nolan',
            cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine', 'Maggie Gyllenhaal'],
            synopsis:
                'När ett hot känt som Jokern sprider kaos och förödelse bland folket i Gotham, måste Batman, James Gordon och Harvey Dent samarbeta för att sätta stopp för galenskapen.',
            genre: ['Thriller', 'Action', 'Drama'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            year: 2008,
        },
        posterUrl: 'https://m.media-amazon.com/images/I/81rGCm0PyHL.jpg',
        trailerUrl: 'EXeTwQWrcwY',
    },
    {
        title: 'Insidan ut 2',
        durationMin: 96,
        ageLimit: 0,
        description: {
            director: 'Kelsey Mann',
            cast: ['Amy Poehler', 'Maya Hawke', 'Kensington Tallman', 'Liza Lapira', 'Tony Hale'],
            synopsis:
                'En uppföljare där Riley går in i puberteten och upplever helt nya, mer komplexa känslor som en följd. När Riley försöker anpassa sig till sina tonår, kämpar hennes gamla känslor med att anpassa sig till möjligheten att bli ersatta.',
            genre: ['Drama', 'Komedi', 'Familj', 'Animation'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            year: 2024,
        },
        posterUrl: 'https://www.varmland.bio/wp-content/uploads/2024/05/Insidan-ut-2-Poster.jpg',
        trailerUrl: 'LEjhY15eCx0',
    },
    {
        title: 'Dumma mej 4',
        durationMin: 94,
        ageLimit: 0,
        description: {
            director: ['Chris Renaud', 'Patrick Delage'],
            cast: ['Steve Carell', 'Pierre Coffin', 'Will Ferrell', 'Sofía Vergara', 'Chris Renaud'],
            synopsis:
                'Gru, Lucy, Margo, Edith och Agnes välkomnar en ny familjemedlem, Gru Jr., som är fast besluten att plåga sin pappa. Samtidigt ställs Gru inför en ny fiende, Maxime Le Mal, och hans flickvän Valentina, vilket tvingar hela familjen att fly och kämpa för att hålla sig ett steg före.',
            genre: ['Drama', 'Komedi', 'Familj', 'Animation'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            year: 2024,
        },
        posterUrl: 'https://media.ginza.se/Images/item_img_1200/18708.jpg',
        trailerUrl: 'yJMLO4oTmww',
    },
]

const movieQuery = `INSERT INTO 
movies 
(title, durationMin, 
ageLimit, description, 
trailerUrl, posterUrl) 
VALUES 
(?,?,?,?,?,?)`

movies.forEach((movie) => {
    db.prepare(movieQuery).run(
        movie.title,
        movie.durationMin,
        movie.ageLimit,
        JSON.stringify(movie.description),
        movie.posterUrl,
        movie.trailerUrl
    )
})
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

