const httpProxy = require('express-http-proxy');
const express = require('express');
const apiGateway = express();
const logger = require('morgan');

apiGateway.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/user'))
        return 'http://localhost:8080/';
    else if (req.path.startsWith('/Pontos'))
        return 'http://localhost:8090/';
    else return null;
}

apiGateway.use((req, res, next) => {
    const proxyHost = selectProxyHost(req);
    if (proxyHost == null)
        res.status(404).send('Not found');
    else
        httpProxy(proxyHost)(req, res, next);
});

apiGateway.listen(8000, () => {
    console.log('Gateway running in port: ' ++++++++++++++ );
});
