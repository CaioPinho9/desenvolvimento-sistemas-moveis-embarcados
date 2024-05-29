// Inicia o Express.js
const express = require('express');
const app = express();

// Body Parser - usado para processar dados da requisição HTTP
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Método HTTP GET /hello - envia a mensagem: Hello World
app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// Inicia o Servidor na porta 8080
let porta = 8080;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});
