import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const db = new database(dbPath)
const cinemasTableQuery = `
CREATE TABLE IF NOT EXISTS cinemas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
`
const insertCinemasQuery = `
INSERT INTO cinemas(name) VALUES
('Stora salongen'),
('Lilla salongen');
`
db.exec(cinemasTableQuery)
// db.exec(insertCinemasQuery)
console.log(cinemasTableQuery)
