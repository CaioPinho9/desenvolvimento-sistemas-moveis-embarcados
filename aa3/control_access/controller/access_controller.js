const {db} = require('../database/database');
const fetch = require('node-fetch');

const cost = 1;

const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`${response.status} ${message}`);
    }
    return response.json();
};

const registerAccess = (cpf, place, res, successMessage) => {
    db.run(`INSERT INTO tb_access(cpf, place) VALUES(?, ?)`, [cpf, place], (err) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Failed to register access.');
        }
        return res.status(200).send(successMessage);
    });
};

const handleUserCredits = async (cpf, category) => {
    if (category === 'student' || category === 'visitor') {
        const response = await fetch(`http://localhost:8080/credits/${cpf}/${-cost}`, {method: 'PATCH'});
        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.status} ${message}`);
        }
    }
};

const openGate = async () => {
    await fetch(`http://localhost:8080/gate/open`, {method: 'POST'});
}

exports.enterParking = async (req, res) => {
    const {cpf, place} = req.body;

    try {
        const user = await fetchJson(`http://localhost:8080/user/${cpf}`);
        const parking = await fetchJson(`http://localhost:8080/parking/${place}`);

        if (parking.available_parkings <= 0) {
            return res.status(404).send('Parking spot not available.');
        }

        await handleUserCredits(cpf, user.category);
        await openGate()
        registerAccess(cpf, place, res, 'Access granted.');
    } catch (error) {
        if (error.message.startsWith('404')) {
            return res.status(404).send(error.message.replace('404 ', ''));
        }
        console.error('Error:', error);
        return res.status(500).send('Failed to process parking entry.');
    }
};

exports.exitParking = async (req, res) => {
    const {cpf, place} = req.body;

    try {
        await fetchJson(`http://localhost:8080/user/${cpf}`);
        await fetchJson(`http://localhost:8080/parking/${place}`);

        await openGate()
        registerAccess(cpf, place, res, 'Leave granted.');
    } catch (error) {
        if (error.message.startsWith('404')) {
            return res.status(404).send(error.message.replace('404 ', ''));
        }
        console.error('Error:', error);
        return res.status(500).send('Failed to process parking exit.');
    }
};

exports.getAllAccess = (req, res) => {
    db.all(`SELECT * FROM tb_access`, [], (err, rows) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Failed to retrieve access logs.');
        }
        return res.status(200).json(rows);
    });
};
