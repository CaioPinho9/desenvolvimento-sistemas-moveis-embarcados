const {db} = require("../database/database");
const {isValidCPF} = require("../validations/validations");

exports.createUser = (req, res) => {
    db.run(`INSERT INTO tb_user(name, category, cpf) VALUES(?,?,?)`,
        [req.body.name, req.body.category, req.body.cpf], (err) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    console.log("Error: Duplicate CPF");
                    return res.status(409).send('CPF already exists.');
                } else {
                    console.log("Error: " + err);
                    return res.status(500).send('Failed to register user.');
                }
            } else {
                console.log('User created successfully!');
                return res.status(200).send('User created successfully!');
            }
        });
};
exports.getAllUsers = (req, res) => {
    db.all(`SELECT * FROM tb_user`, [], (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return users.');
        } else {
            return res.status(200).json(result);
        }
    });
};

exports.getUserByCPF = (req, res) => {
    if (!isValidCPF(req.params.cpf)) {
        return res.status(400).send('Invalid CPF format.');
    }

    db.get(`SELECT * FROM tb_user WHERE cpf = ?`, req.params.cpf, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return user.');
        } else if (result == null) {
            console.log("User not found.");
            return res.status(404).send('User not found.');
        } else {
            return res.status(200).json(result);
        }
    });
};

exports.updateUser = (req, res) => {
    const {name, category} = req.body;
    if (name && typeof name !== 'string') {
        return res.status(400).send('Invalid name.');
    }
    if (category && typeof category !== 'string') {
        return res.status(400).send('Invalid category.');
    }

    db.run(`UPDATE tb_user SET name = COALESCE(?,name), category = COALESCE(?,category) WHERE cpf = ?`,
        [req.body.name, req.body.category, req.params.cpf], function (err) {
            if (err) {
                return res.status(500).send('Failed to update user.');
            } else if (this.changes === 0) {
                console.log("User not found.");
                return res.status(404).send('User not found.');
            } else {
                return res.status(200).send('User updated successfully!');
            }
        });
};

exports.deleteUser = (req, res) => {
    if (!isValidCPF(req.params.cpf)) {
        return res.status(400).send('Invalid CPF format.');
    }

    db.run(`DELETE FROM tb_user WHERE cpf = ?`, req.params.cpf, function (err) {
        if (err) {
            return res.status(500).send('Failed to delete user.');
        } else if (this.changes === 0) {
            console.log("User not found.");
            return res.status(404).send('User not found.');
        } else {
            return res.status(200).send('User removed successfully!');
        }
    });
};
