const {db} = require("../database/database");
const {isValidColorList} = require("../validations/validations");

exports.setLightSensitivity = async (req, res) => {
    const {lightSensitivity} = req.body;

    if (!Number.isInteger(lightSensitivity)) {
        return res.status(400).send('Invalid light sensitivity.');
    }

    db.run(`UPDATE tb_config SET light_sensitivity = ?`, [lightSensitivity], function (err) {
        if (err) {
            return res.status(500).send('Failed to save light sensitivity.');
        } else {
            return res.status(200).send('Light sensitivity saved successfully.');
        }
    });
};

exports.setColors = async (req, res) => {
    const {colors} = req.body;

    isValidColorList(colors);

    db.run(`UPDATE tb_config SET colors = ?`, [JSON.stringify(colors)], function (err) {
        if (err) {
            return res.status(500).send('Failed to save colors.');
        } else {
            return res.status(200).send('Colors saved successfully.');
        }
    });
};

exports.getConfigurations = async (req, res) => {
    db.all(`SELECT light_sensitivity, colors FROM tb_config`, {}, function (err, rows) {
        if (err) {
            return res.status(500).send('Failed to retrieve configurations.');
        } else {
            return res.status(200).json(rows);
        }
    });
};
