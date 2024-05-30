const {db} = require('../database/database');

exports.createParking = (req, res) => {
    const {place, totalParking} = req.body;
    if (!place || typeof place !== 'string') {
        return res.status(400).send('Invalid or missing place.');
    }
    if (!Number.isInteger(totalParking) || totalParking <= 0) {
        return res.status(400).send('Invalid total parking.');
    }

    db.run(`INSERT INTO tb_parking(place, total_parking, available_parking) VALUES(?,?,?)`,
        [place, totalParking, totalParking], (err) => {
            if (err) {
                console.log("Error: " + err);
                if (err.code === 'SQLITE_CONSTRAINT') {
                    console.log("Error: Duplicate place");
                    return res.status(409).send('Place already exists.');
                } else {
                    return res.status(500).send('Failed to create parking.');
                }
            } else {
                console.log('Parking created successfully!');
                return res.status(200).send('Parking created successfully!');
            }
        });
};

exports.getAllParking = (req, res) => {
    db.all(`SELECT * FROM tb_parking`, [], (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return parking.');
        } else {
            return res.status(200).json(result);
        }
    });
};

exports.getParkingByPlace = (req, res) => {
    const place = req.params.place;
    if (!place || typeof place !== 'string') {
        return res.status(400).send('Invalid place format.');
    }

    db.get(`SELECT available_parking FROM tb_parking WHERE place = ?`, place, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return available parking.');
        } else if (result == null) {
            console.log("Parking not found.");
            return res.status(404).send('Parking not found.');
        } else {
            return res.status(200).json(result);
        }
    });
};

exports.takeParkingAvailability = (req, res) => {
    const place = req.params.place;
    if (!place || typeof place !== 'string') {
        return res.status(400).send('Invalid place format.');
    }

    db.get(`SELECT available_parking, total_parking FROM tb_parking WHERE place = ?`, place, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return parking information.');
        }
        if (result == null) {
            console.log("Parking not found.");
            return res.status(404).send('Parking not found.');
        }

        let updatedAvailableParking = result.available_parking - 1;
        if (updatedAvailableParking < 0) {
            return res.status(400).send('Invalid operation: resulting parking out of bounds.');
        }

        db.run(`UPDATE tb_parking SET available_parking = ? WHERE place = ?`, [updatedAvailableParking, place], function (err) {
            if (err) {
                return res.status(500).send('Failed to update parking availability.');
            }
            if (this.changes === 0) {
                console.log("Parking not found.");
                return res.status(404).send('Parking not found.');
            }
            return res.status(200).send('Parking availability updated successfully!');
        });
    });
};

exports.releaseParkingAvailability = (req, res) => {
    const place = req.params.place;
    if (!place || typeof place !== 'string') {
        return res.status(400).send('Invalid place format.');
    }

    db.get(`SELECT available_parking, total_parking FROM tb_parking WHERE place = ?`, place, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return parking information.');
        }
        if (result == null) {
            console.log("Parking not found.");
            return res.status(404).send('Parking not found.');
        }

        let updatedAvailableParking = result.available_parking + 1;
        if (updatedAvailableParking > result.total_parking) {
            return res.status(400).send('Invalid operation: resulting parking out of bounds.');
        }

        db.run(`UPDATE tb_parking SET available_parking = ? WHERE place = ?`, [updatedAvailableParking, place], function (err) {
            if (err) {
                return res.status(500).send('Failed to update parking availability.');
            }
            if (this.changes === 0) {
                console.log("Parking not found.");
                return res.status(404).send('Parking not found.');
            }
            return res.status(200).send('Parking availability updated successfully!');
        });
    });
};
