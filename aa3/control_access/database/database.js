const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/access.db', (err) => {
    if (err) {
        console.log('ERROR: Failed to connect to SQLite.');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS tb_access (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    cpf INTEGER NOT NULL, 
    place TEXT NOT NULL,
    enter BOOLEAN NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
[], (err) => {
    if (err) {
        console.log('ERROR: Failed to create table.');
        throw err;
    }
});
module.exports = {db};
