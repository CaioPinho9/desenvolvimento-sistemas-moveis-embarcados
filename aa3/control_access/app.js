const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/access_routes');

const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
