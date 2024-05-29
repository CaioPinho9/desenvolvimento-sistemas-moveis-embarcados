const {db} = require("./database");

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/user', (req, res, next) => {
    db.run(`INSERT INTO tb_user(name, category, cpf) VALUES(?,?,?)`,
        [req.body.name, req.body.category, req.body.cpf], (err) => {
            if (err) {
                console.log("Error: " + err);
                res.status(500).send('Failed to register user.');
            } else {
                console.log('User created successfully!');
                res.status(200).send('User created successfully!');
            }
        });
});

app.get('/user', (req, res, next) => {
    db.all(`SELECT * FROM tb_user`, [], (err, result) => {
        if (err) {
            console.log("Error: " + err);
            res.status(500).send('Failed to return users.');
        } else {
            res.status(200).json(result);
        }
    });
});

app.get('/user/:cpf', (req, res, next) => {
    db.get(`SELECT * FROM tb_user WHERE cpf = ?`,
        req.params.cpf, (err, result) => {
            if (err) {
                console.log("Erro: " + err);
                res.status(500).send('Failed to return user.');
            } else if (result == null) {
                console.log("User not found.");
                res.status(404).send('User not found.');
            } else {
                res.status(200).json(result);
            }
        });
});

app.patch('/user/:cpf', (req, res, next) => {
    db.run(`UPDATE tb_user SET name = COALESCE(?,name), category = COALESCE(?,category) WHERE cpf = ?`,
        [req.body.name, req.body.category, req.params.cpf], function (err) {
            if (err) {
                res.status(500).send('Failed to update user.');
            } else if (this.changes == 0) {
                console.log("User not found.");
                res.status(404).send('User not found.');
            } else {
                res.status(200).send('User updated successfully!');
            }
        });
});

app.delete('/user/:cpf', (req, res, next) => {
    db.run(`DELETE FROM tb_user WHERE cpf = ?`, req.params.cpf, function (err) {
        if (err) {
            res.status(500).send('Failed to delete user.');
        } else if (this.changes == 0) {
            console.log("User not found.");
            res.status(404).send('User not found.');
        } else {
            res.status(200).send('User removed successfully!');
        }
    });
});


let porta = 8080;
app.listen(porta, () => {
    console.log('Server running in port: ' + porta);
});
