const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/parking.db', (err) => {
    if (err) {
        console.log('ERROR: Failed to connect to SQLite.');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS tb_parking (
        place TEXT PRIMARY KEY NOT NULL, 
        total_parking INTEGER NOT NULL, 
        available_parking INTEGER NOT NULL CHECK(available_parking >= 0 AND available_parking <= total_parking))`,
    [], (err) => {
        if (err) {
            console.log('ERROR: Failed to create table.');
            throw err;
        }
    });

module.exports = { db };
