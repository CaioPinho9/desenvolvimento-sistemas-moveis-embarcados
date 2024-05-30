const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/gate_routes');

const app = express();
const port = 8083;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
