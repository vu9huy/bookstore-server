const ExpressServer = require('./server');

const { PORT } = require('../config/environment');
const logger = require('../common/logger');
const MongoAdapter = require('../common/infrastructure/mongo.adapter');

const shutdownProperly = (exitCode, express) => {
    Promise.resolve()
        .then(() => express.kill())
        .then(() => MongoAdapter.disConnect())
        .then(() => {
            logger.info('Shutdown complete, bye bye!');
            process.exit(exitCode);
        })
        .catch((err) => {
            logger.error('Error during shutdown', err);
            process.exit(1);
        });
};

const handleExit = (express) => {
    process.on('uncaughtException', (err) => {
        logger.error('Uncaught exception', err);
        shutdownProperly(1, express);
    });
    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled Rejection at promise', reason);
        shutdownProperly(2, express);
    });
    process.on('SIGINT', () => {
        logger.info('Caught SIGINT, exitting!');
        shutdownProperly(128 + 2, express);
    });
    process.on('SIGTERM', () => {
        logger.info('Caught SIGTERM, exitting');
        shutdownProperly(128 + 2, express);
    });
    process.on('exit', () => {
        logger.info('Exiting process...');
    });
};

exports.createApplication = async () => {
    await MongoAdapter.connectDatabase();
    const expressServer = ExpressServer.setup(PORT);
    handleExit(ExpressServer);
    return expressServer;
};
