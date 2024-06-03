const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {

    if (req.path.startsWith('/access')) {
        return 'http://localhost:8081/';
    } else if (req.path.startsWith('/credits')) {
        return 'http://localhost:8082/';
    } else if (req.path.startsWith('/parking')) {
        return 'http://localhost:8084/';
    } else if (req.path.startsWith('/user'))
        return 'http://localhost:8085/';
    else return null;
}

app.use((req, res, next) => {
    const proxyHost = selectProxyHost(req);
    if (proxyHost == null)
        return res.status(404).send('Not found');
    else
        httpProxy(proxyHost)(req, res, next);
});

let port = 8080;
app.listen(port, () => {
    console.log('Gateway running in port: ' + port);
});
