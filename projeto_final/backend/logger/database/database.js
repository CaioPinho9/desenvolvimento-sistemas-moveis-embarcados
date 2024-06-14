const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/log.db', (err) => {
    if (err) {
        console.log('ERROR: Failed to connect to SQLite.');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS tb_log
        (id INTEGER PRIMARY KEY NOT NULL UNIQUE, input TEXT NOT NULL, value TEXT NOT NULL, date TEXT DEFAULT CURRENT_TIMESTAMP)`,
    [], (err) => {
        if (err) {
            console.log('ERROR: Failed to create table.');
            throw err;
        }
    });

module.exports = {db};
