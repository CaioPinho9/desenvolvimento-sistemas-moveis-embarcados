const {db} = require("../database/database");

exports.log = async (req, res) => {
    const {input, value} = req.body;

    db.run(`INSERT INTO tb_log(input, value) VALUES(?,?)`,
        [input, value], (err) => {
            if (err) {
                console.log("Error: " + err);
                return res.status(500).send('Failed to log.');
            } else {
                console.log('Log created successfully!');
                return res.status(200).send('Log created successfully!');
            }
        });
};

exports.getLogs = async (req, res) => {
    db.all(`SELECT * FROM tb_log`, [], (err, rows) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to retrieve logs.');
        } else {
            return res.status(200).json(rows);
        }
    });
};
