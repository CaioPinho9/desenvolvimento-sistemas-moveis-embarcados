const {db} = require("../database/database");
const {isValidCPF, validateUserIsCategory} = require("../validations/validations");

exports.createAccount = async (req, res) => {
    if (!isValidCPF(req.params.cpf)) {
        return res.status(400).send('Invalid CPF format.');
    }

    if (await validateUserIsCategory(res, req.params.cpf) !== true) {
        return;
    }

    db.run(`INSERT INTO tb_credits(cpf, credits) VALUES(?,?)`,
        [req.params.cpf, 0], (err) => {
            if (err) {
                console.log("Error: " + err);
                if (err.code === 'SQLITE_CONSTRAINT') {
                    console.log("Error: Duplicate CPF");
                    return res.status(409).send('CPF already exists.');
                } else {
                    return res.status(500).send('Failed to register account.');
                }
            } else {
                console.log('Account created successfully!');
                return res.status(200).send('Account created successfully!');
            }
        });
};

exports.getCredits = (req, res) => {
    if (!isValidCPF(req.params.cpf)) {
        return res.status(400).send('Invalid CPF format.');
    }

    db.get(`SELECT credits FROM tb_credits WHERE cpf = ?`, req.params.cpf, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return credits.');
        } else if (result == null) {
            console.log("Account not found.");
            return res.status(404).send('Account not found.');
        } else {
            return res.status(200).json(result);
        }
    });
};

exports.transaction = (req, res) => {
    if (!isValidCPF(req.params.cpf)) {
        return res.status(400).send('Invalid CPF format.');
    }

    db.get(`SELECT credits FROM tb_credits WHERE cpf = ?`, req.params.cpf, (err, result) => {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Failed to return credits.');
        }
        if (result == null) {
            console.log("Account not found.");
            return res.status(404).send('Account not found.');
        }

        let updatedCredits = result.credits + Number(req.params.credits);
        if (updatedCredits < 0) {
            return res.status(400).send('Insufficient credits. Current balance: ' + result.credits);
        }

        db.run(`UPDATE tb_credits SET credits = ? WHERE cpf = ?`, [updatedCredits, req.params.cpf], function (err) {
            if (err) {
                return res.status(500).send('Failed to update credits.');
            }
            if (this.changes === 0) {
                console.log("Account not found.");
                return res.status(404).send('Account not found.');
            }
            return res.status(200).send('Account updated successfully!');
        });
    });
};
