const express = require('express');
const bodyParser = require('body-parser');
const parkingRoutes = require('./routes/parking_routes');

const app = express();
const port = 8084;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', parkingRoutes);

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
