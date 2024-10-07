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
        title: 'Star Wars: Episod IV',
        durationMin: 121,
        ageLimit: 11,
        description: {
            director: 'George Lucas',
            cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Peter Cushing'],
            synopsis:
                "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl:
            'https://d2iltjk184xms5.cloudfront.net/uploads/photo/file/278384/924741845814193e3c4b1e5a78372dbb-stjarnornas_krig_77_20_1_.jpg',
        trailerUrl: 'XHk5kCIiGoM',
    },
    {
        title: 'Star Wars: Episod V',
        durationMin: 124,
        ageLimit: 15,
        description: {
            director: 'George Lucas',
            cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Peter Cushing'],
            synopsis:
                'After the Empire overpowers the Rebel Alliance, Luke Skywalker begins his Jedi training with Yoda. At the same time, Darth Vader and bounty hunter Boba Fett pursue his friends across the galaxy.',
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl:
            'https://cdn.europosters.eu/image/1300/posters/star-wars-episode-v-the-empire-strikes-back-i90219.jpg',
        trailerUrl: 'JNwNXF9Y6kY',
    },
    {
        title: 'Star Wars: Episod VI',
        durationMin: 131,
        ageLimit: 11,
        description: {
            director: 'George Lucas',
            cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Peter Cushing'],
            synopsis:
                "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl: 'https://m.media-amazon.com/images/I/61c7U8DqV3L._AC_UF894,1000_QL80_.jpg',
        trailerUrl: '7L8p7_SLzvU',
    },
    {
        title: 'Star Wars: Episode I',
        durationMin: 136,
        ageLimit: 11,
        description: {
            director: 'George Lucas',
            cast: ['Liam Neeson', 'Ewan McGregor', 'Natalie Portman', 'Jake Lloyd'],
            synopsis:
                'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl: 'https://m.media-amazon.com/images/I/71n0i1MoxJL._AC_UF894,1000_QL80_.jpg',
        trailerUrl: 'bD7bpG-zDJQ',
    },
    {
        title: 'Star Wars: Episode II',
        durationMin: 142,
        ageLimit: 11,
        description: {
            director: 'George Lucas',
            cast: ['Hayden Christensen', 'Ewan McGregor', 'Natalie Portman', 'Jake Lloyd'],
            synopsis:
                'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi discovers a secret clone army crafted for the Jedi.',
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl: 'https://m.media-amazon.com/images/I/51VJFj3OpzL._AC_UF1000,1000_QL80_.jpg',
        trailerUrl: 'gYbW1F_c9eM',
    },
    {
        title: 'Star Wars: Episode III',
        durationMin: 140,
        ageLimit: 11,
        description: {
            director: 'George Lucas',
            cast: ['Hayden Christensen', 'Ewan McGregor', 'Natalie Portman', 'Jake Lloyd'],
            synopsis:
                'Three years into the Clone Wars, Obi-Wan Kenobi pursues a new threat, while Anakin Skywalker is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.',
            genre: ['Action', 'Adventure', 'Fantasy'],
        },
        posterUrl: 'https://static.displate.com/857x1200/displate/2017-02-28/9031e92838d7ebc3b8145074567a0ed6.jpg',
        trailerUrl: '5UnjrG_N8hU',
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
