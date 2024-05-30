const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');

const app = express();
const port = 8085;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
