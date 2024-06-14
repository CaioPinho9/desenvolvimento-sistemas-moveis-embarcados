const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/config.db', (err) => {
    if (err) {
        console.log('ERROR: Failed to connect to SQLite.');
        throw err;
    }
    console.log('Connected to SQLite!');
});

db.run(`CREATE TABLE IF NOT EXISTS tb_config
        (light_sensitivity INTEGER, colors TEXT)`,
    [], (err) => {
        if (err) {
            console.log('ERROR: Failed to create table.');
            throw err;
        } else {
            db.get(`SELECT COUNT(*) as count FROM tb_config`, [], (err, row) => {
                if (err) {
                    console.log('ERROR: Failed to retrieve data.');
                    throw err;
                }

                if (row.count === 0) {
                    db.run(`INSERT INTO tb_config (light_sensitivity, colors) VALUES (?, ?)`, [0, '[[1,1,1]]'], function (err) {
                        if (err) {
                            console.log('ERROR: Failed to insert data.');
                            throw err;
                        }
                        console.log('Initial row inserted.');
                    });
                }
            });
        }
    });


module.exports = {db};
