const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/user.db', (err) => {
    if (err) {
        console.log('ERROR: Failed to connect to SQLite.');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS tb_user 
        (name TEXT NOT NULL, category TEXT NOT NULL, 
         cpf INTEGER PRIMARY KEY NOT NULL UNIQUE)`,
    [], (err) => {
        if (err) {
            console.log('ERROR: Failed to create table.');
            throw err;
        }
    });

module.exports = {db};
