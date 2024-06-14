const {db} = require("../database/database");
const {isValidColorList} = require("../validations/validations");

exports.setConfiguration = async (req, res) => {
    console.log("Setting configuration...")
    const {lightSensitivity, colors} = req.body;

    if (!Number.isInteger(lightSensitivity)) {
        return res.status(400).send('Invalid light sensitivity.');
    }

    const msg = isValidColorList(colors);
    if (msg !== true) {
        return res.status(400).send(`Invalid value colors. ${msg}`);
    }

    db.run(`UPDATE tb_config SET light_sensitivity = ?, colors = ?`, [lightSensitivity, JSON.stringify(colors)], function (err) {
        if (err) {
            return res.status(500).send('Failed to save configuration.');
        } else {
            return res.status(200).send('Configuration saved successfully.');
        }
    });
};

exports.getConfigurations = async (req, res) => {
    console.log("Getting configurations...")
    db.all(`SELECT light_sensitivity, colors FROM tb_config`, {}, function (err, rows) {
        if (err) {
            return res.status(500).send('Failed to retrieve configurations.');
        } else {
            console.log(rows)
            return res.status(200).json(rows);
        }
    });
};
