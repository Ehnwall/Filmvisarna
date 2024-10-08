import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const db = new database(dbPath)

const moviesTableQuery = `CREATE TABLE IF NOT EXISTS movies(Id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, durationMin INTEGER NOT NULL, ageLimit INTEGER NOT NULL, description TEXT NOT NULL, trailerUrl TEXT NOT NULL, posterUrl TEXT NOT NULL );`

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

const movieQuery = `INSERT INTO movies (title, durationMin, ageLimit, description, trailerUrl, posterUrl) VALUES (?,?,?,?,?,?)`

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

const getAllMovies = () => {
    const query = `SELECT * FROM movies`

    const movies = db.prepare(query).all()

    return movies
}

console.log(getAllMovies())
