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

// Inicia o Servidor na port 8081
let port = 8081;
app.listen(port, () => {
    console.log('Servidor em execução na port: ' + port);
});
