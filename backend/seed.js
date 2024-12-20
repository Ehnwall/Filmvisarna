import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}
const db = new database(dbPath)

// TA BORT ALLA TABELLER OCH VYER
const dropTablesQuery = `
    DROP TABLE IF EXISTS bookingXseatsXticket;
    DROP TABLE IF EXISTS bookings;
    DROP TABLE IF EXISTS shows;
    DROP TABLE IF EXISTS cinemaSeats;
    DROP TABLE IF EXISTS cinemas;
    DROP TABLE IF EXISTS ticketTypes;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS movies;
    DROP VIEW IF EXISTS userBookings;
`

db.exec(dropTablesQuery)

const moviesTableQuery = `
CREATE TABLE IF NOT EXISTS movies(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    durationMin INTEGER NOT NULL,
    ageLimit INTEGER NOT NULL,
    description TEXT NOT NULL,
    trailerUrl TEXT NOT NULL,
    posterUrl TEXT NOT NULL
);
`

// CREATE TABLES

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
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'The Shawshank Redemption',
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
            genre: ['Drama', 'Gangster', 'Brottslighet'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'The Godfather',
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
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'The Dark Knight',
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
            genre: ['Drama', 'Komedi', 'Animation'],
            language: 'Svenska',
            text: 'Ingen',
            originalTitle: 'Inside Out 2',
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
            genre: ['Drama', 'Komedi', 'Animation'],
            language: 'Svenska',
            text: 'Ingen',
            originalTitle: 'Despicable Me 4',
            year: 2024,
        },
        posterUrl: 'https://www.movieposters.com/cdn/shop/files/despicable_me_four_477x.jpg?v=1708104714',
        trailerUrl: 'yJMLO4oTmww',
    },
    {
        title: 'Joker',
        durationMin: 122,
        ageLimit: 15,
        description: {
            director: ['Todd Phillips'],
            cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
            synopsis:
                'Arthur Fleck, en festclown och misslyckad ståuppkomiker, lever ett fattigt liv tillsammans med sin sjuka mor. När samhället stöter bort honom och kallar honom en "freak" bestämmer han sig för att omfamna ett liv i kaos i Gotham City.',
            genre: ['Brott', 'Thriller', 'Drama'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'Joker',
            year: 2019,
        },
        posterUrl: 'https://www.vintagemovieposters.co.uk/wp-content/uploads/2020/05/IMG_3693-scaled.jpeg',
        trailerUrl: 't433PEQGErc',
    },
    {
        title: 'Hotell Transylvanien',
        durationMin: 91,
        ageLimit: 7,
        description: {
            director: ['Genndy Tartakovsky'],
            cast: ['Adam Sandler', 'Andy Samberg', 'Selena Gomez', 'Kevin James'],
            synopsis:
                'Dracula, som driver en lyxig resort långt bort från människovärlden, blir överbeskyddande när en pojke upptäcker resorten och blir förälskad i grevens tonårsdotter.',
            genre: ['Animation', 'Komedi', 'Familj'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'Hotel Transylvania',
            year: 2012,
        },
        posterUrl: 'https://m.media-amazon.com/images/I/71Fa5uSdoFL._AC_UF1000,1000_QL80_.jpg',
        trailerUrl: 'q4RK3jY7AVk',
    },
    {
        title: 'Landet för längesedan',
        durationMin: 69,
        ageLimit: 7,
        description: {
            director: ['Don Bluth'],
            cast: ['Pat Hingle', 'Helen Shaver', 'Gabriel Damon', 'Kevin James'],
            synopsis:
                'En föräldralös brontosaurus slår sig ihop med andra unga dinosaurier för att återförenas med sina familjer i en dal.',
            genre: ['Animation', 'Familj', 'Äventyr'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'The Land Before Time',
            year: 1988,
        },
        posterUrl:
            'https://www.uphe.com/sites/default/files/styles/scale__319w_/public/LandBeforetime_PosterArt.webp?itok=C5T1_RgM',
        trailerUrl: 'FBaGXDRNnQI',
    },
    {
        title: 'Frankenweenie',
        durationMin: 87,
        ageLimit: 11,
        description: {
            director: ['Tim Burton'],
            cast: ['Catherine O Hara', 'Martin Short', 'Martin Landau', 'Charlie Tahan'],
            synopsis:
                'När en pojkes älskade hund plötsligt går bort försöker han återuppliva djuret genom ett kraftfullt vetenskapligt experiment.',
            genre: ['Animation', 'Familj', 'Drama'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'Frankenweenie',
            year: 2012,
        },
        posterUrl: 'https://image.tmdb.org/t/p/original/vZULuYUKxe4iQNOacgcZlvz81jz.jpg',
        trailerUrl: 'xrxEQPBbkjY',
    },
    {
        title: 'Toy Story',
        durationMin: 81,
        ageLimit: 7,
        description: {
            director: ['John Lasseter'],
            cast: ['Tom Hanks', 'Tim Allen', 'Don Rickles', 'Jim Varney', 'Wallace Shawn'],
            synopsis:
                'En cowboydocka känner sig djupt hotad och svartsjuk när en ny rymdactionfigur tar hans plats som den främsta leksaken i en pojkes sovrum.',
            genre: ['Animation', 'Familj', 'Drama'],
            speech: ['Svenska', 'Engelska'],
            language: 'Engelska',
            text: 'Svenska',
            originalTitle: 'Toy Story',
            year: 1995,
        },
        posterUrl: 'https://m.media-amazon.com/images/I/71aBLaC4TzL._AC_UF894,1000_QL80_.jpg',
        trailerUrl: 'CxwTLktovTU',
    },
    {
        title: 'Nightmare Before Christmas',
        durationMin: 76,
        ageLimit: 11,
        description: {
            director: ['Henry Selick'],
            cast: ['Danny Elfman', 'Chris Sarandon', 'Catherine O Hara', 'William Hickey'],
            synopsis:
                'Jack Skellington, kungen av Halloween Town, upptäcker Christmas Town, men hans försök att föra julen till sitt hem orsakar förvirring.',
            genre: ['Animation', 'Familj', 'Musikal'],
            speech: ['Svenska', 'Engelska'],
            language: ['Engelska', 'Svenska'],
            originalTitle: 'The Nightmare Before Christmas',
            year: 1993,
        },
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9a/The_nightmare_before_christmas_poster.jpg',
        trailerUrl: 'Y0xheV_0AKg',
    },
]

const movieQuery = `INSERT INTO
movies
(title, durationMin,
ageLimit, description,
trailerUrl, posterUrl)
VALUES
(?,?,?,?,?,?)`

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

const createShows = `
CREATE TABLE IF NOT EXISTS shows (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    movieId INTEGER,
    time TEXT,
    cinemaId INTEGER,
    FOREIGN KEY (movieId) REFERENCES movies(Id),
    FOREIGN KEY (cinemaId) REFERENCES cinemas(Id)
);
`

const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    showId INTEGER,
    bookingNumberId TEXT,
    FOREIGN KEY (userId) REFERENCES users(Id),
    FOREIGN KEY (showId) REFERENCES shows(Id)
);

`

const bookingTestData = `
INSERT INTO bookings (userId, showId, bookingNumberId) VALUES
(1, 1, 'BN001'),
(2, 1, 'BN002'),
(3, 2, 'BN003'),
(4, 3, 'BN004'),
(5, 3, 'BN005');
`

function getLocalISOString(daysOffset, hours, minutes) {
    const now = new Date()
    const targetDate = new Date(now)
    targetDate.setDate(now.getDate() + daysOffset)
    targetDate.setHours(hours, minutes, 0, 0)

    const localTargetDate = new Date(targetDate.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' }))

    return localTargetDate.toISOString()
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function generateShowTestData() {
    const shows = []
    const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const cinemas = [1, 2]
    const times = [
        { hours: 18, minutes: 30 },
        { hours: 16, minutes: 30 },
        { hours: 13, minutes: 30 },
    ]

    for (let day = 0; day < 28; day++) {
        for (const cinema of cinemas) {
            for (const time of times) {
                const movie = getRandomElement(movies)
                shows.push({ movieId: movie, time: getLocalISOString(day, time.hours, time.minutes), cinemaId: cinema })
            }
        }
    }

    return shows
}

const showTestData = generateShowTestData()

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

const userQuery = `
    INSERT INTO users (email, password, firstName, lastName, role) VALUES
    ('eric.classon@example.com', '$2a$12$vPbTAC0yc6LkJjvEJ1iNAe6m6mjs2cDvKikhVf5.xJDZxepV3Slbi', 'Erik', 'Classon', 'admin'),
    ('alvin.samuelsson@example.com', '$2a$12$vPbTAC0yc6LkJjvEJ1iNAe6m6mjs2cDvKikhVf5.xJDZxepV3Slbi', 'Alvin', 'Samuelsson', 'user'),
    ('dennis.ehnwall@example.com', '$2a$12$vPbTAC0yc6LkJjvEJ1iNAe6m6mjs2cDvKikhVf5.xJDZxepV3Slbi', 'Dennis', 'Ehnwall', 'user'),
    ('kalle.pettersson@example.com', '$2a$12$vPbTAC0yc6LkJjvEJ1iNAe6m6mjs2cDvKikhVf5.xJDZxepV3Slbi', 'Kalle', 'Pettersson', 'user'),
    ('pontus.boman@example.com', '$2a$12$vPbTAC0yc6LkJjvEJ1iNAe6m6mjs2cDvKikhVf5.xJDZxepV3Slbi', 'Pontus', 'Boman', 'user');
`

const createTicketTypeTable = `CREATE TABLE IF NOT EXISTS ticketTypes (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticketType TEXT NOT NULL,
        price INTEGER NOT NULL
    );`

const ticketTypeQuery = `INSERT INTO ticketTypes (ticketType, price) VALUES ('Barn', 80 ), ('Vuxen',  140), ('Pensionär', 120)`

const bookingXseatsXticketQuery = `
CREATE TABLE IF NOT EXISTS bookingXseatsXticket (
    bookingID INTEGER NOT NULL,
    cinemaSeatsID INTEGER NOT NULL,
    ticketTypeID INTEGER NOT NULL,
    FOREIGN KEY (bookingID) REFERENCES bookings(Id),
    FOREIGN KEY (cinemaSeatsID) REFERENCES cinemaSeats(Id),
    FOREIGN KEY (ticketTypeID) REFERENCES ticketTypes(Id)
);
`
const insertBookingXSeatsXTicketQuery = `
INSERT INTO bookingXseatsXticket (bookingID, cinemaSeatsID, ticketTypeID) VALUES (?, ?, ?)
`

const bookingXSeatsXTicketData = [
    { bookingID: 1, cinemaSeatsID: 1, ticketTypeID: 1 },
    { bookingID: 1, cinemaSeatsID: 2, ticketTypeID: 1 },
    { bookingID: 2, cinemaSeatsID: 3, ticketTypeID: 2 },
    { bookingID: 3, cinemaSeatsID: 4, ticketTypeID: 3 },
    { bookingID: 4, cinemaSeatsID: 5, ticketTypeID: 2 },
    { bookingID: 5, cinemaSeatsID: 6, ticketTypeID: 1 },
]

// CREATE TABLES:
db.exec(moviesTableQuery)
db.exec(createUserTable)
db.exec(createTicketTypeTable)
db.exec(createShows)
db.exec(createBookings)
// Kör SQL-frågor för att skapa tabeller och sätta in biografer
db.exec(cinemasTableQuery)
// CREATE cinema seats TABLE
db.exec(cinemaSeatsTableQuery)
db.exec(bookingXseatsXticketQuery)

// INSERTS:
// INSERT movies
movies.forEach((movie) => {
    db.prepare(movieQuery).run(
        movie.title,
        movie.durationMin,
        movie.ageLimit,
        JSON.stringify(movie.description),
        movie.trailerUrl,
        movie.posterUrl
    )
})
// INSERT users
db.exec(userQuery)
// INSERT Ticket types
db.exec(ticketTypeQuery)
// INSERT cinemas
db.exec(insertCinemasQuery)
// INSERT shows
const insertShow = db.prepare('INSERT INTO shows (movieId, time, cinemaId) VALUES (?, ?, ?)')
showTestData.forEach((show) => {
    insertShow.run(show.movieId, show.time, show.cinemaId)
})
// INSERT bookings
db.exec(bookingTestData)

const userBookings = `CREATE VIEW userBookings AS
SELECT
    bookings.Id AS bookingId,
    bookings.bookingNumberId,
    users.Id AS userId,
    users.email AS userEmail,
    users.firstName AS userFirstname,
    users.lastName AS userLastname,
    shows.time AS showTime,
    movies.durationMin AS durationMin,
    cinemas.name AS cinemaName,
    movies.title AS movieTitle,
    movies.posterUrl AS moviePosterUrl,
    ticketTypes.ticketType AS ticketType,
    ticketTypes.price AS ticketPrice,
    cinemaSeats.seatRow,
    cinemaSeats.seatNumber
FROM bookings
JOIN shows ON bookings.showId = shows.Id
JOIN users ON bookings.userId = users.Id
JOIN movies ON shows.movieId = movies.Id
JOIN cinemas ON shows.cinemaId = cinemas.Id
JOIN bookingXseatsXticket ON bookings.Id = bookingXseatsXticket.bookingID
JOIN cinemaSeats ON bookingXseatsXticket.cinemaSeatsID = cinemaSeats.Id
JOIN ticketTypes ON bookingXseatsXticket.ticketTypeID = ticketTypes.Id;`
db.exec(userBookings)

// INSERT to Stora salongen
const storaSalongenRowSizes = [8, 9, 10, 10, 10, 10, 12, 12]
insertSeats(1, storaSalongenRowSizes) // Biograf-ID 1 för Stora salongen

// ISNERT to Lilla salongen
const lillaSalongenRowSizes = [6, 8, 9, 10, 10, 12]
insertSeats(2, lillaSalongenRowSizes) // Biograf-ID 2 för Lilla salongen

bookingXSeatsXTicketData.forEach((data) => {
    db.prepare(insertBookingXSeatsXTicketQuery).run(data.bookingID, data.cinemaSeatsID, data.ticketTypeID)
})
db.close()
console.log('Seed data inserted successfully.')
