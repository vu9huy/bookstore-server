const logger = require('./common/logger');
const { createApplication } = require('./api/application');

createApplication().then(() => {
    logger.info('The api was started successfully!');
});
