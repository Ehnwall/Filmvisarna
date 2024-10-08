import fs from 'fs'
import path from 'path'
import database from 'better-sqlite3'

const dbPath = path.resolve('./backend/db/db.sqlite3')

const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}
const db = new database(dbPath)

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
