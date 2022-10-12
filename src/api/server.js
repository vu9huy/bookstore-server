/* eslint-disable no-shadow */
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../common/logger');
const { NODE_ENV } = require('../config/environment');
const ResponseMiddleware = require('./response.middleware');
const routes = require('./router');
const cors = require('cors');


let httpServerInit;

express.response.sendJSON = function (data) {
    return this.json({ error_code: 0, message: 'OK', data });
};

const listen = (server, port) => {
    logger.info(`Starting server on port ${port} (${NODE_ENV})`);
    return server.listen(port);
};

const setupMiddleware = (server) => {
    // eslint-disable-next-line no-unused-expressions
    NODE_ENV !== 'development' ? server.use(morgan('tiny')) : server.use(morgan('dev'));
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(helmet());
    server.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    server.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'unsafe-inline'"],
            scriptSrc: ["'unsafe-inline'", "'self'"],
        },
    }));
};

const configRoute = (server) => {
    server.use(routes);
};

const setupErrorHandler = (server) => {
    server.use(ResponseMiddleware.converter);
    server.use(ResponseMiddleware.notFound);
    server.use(ResponseMiddleware.handler);
};

exports.setup = (port) => {
    const server = express();
    setupMiddleware(server);
    configRoute(server);
    setupErrorHandler(server);
    httpServerInit = listen(server, port);
    return server;
};

exports.kill = async () => new Promise((resolve, reject) => {
    if (httpServerInit) {
        httpServerInit.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    } else {
        resolve();
    }
});
