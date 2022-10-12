const path = require('path');
const dotenv = require('dotenv-safe');

dotenv.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

exports.APP_NAME = 'manager_service';

exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
exports.LOG_OUTPUT_JSON = process.env.LOG_OUTPUT_JSON === '1';

exports.PORT = parseInt(process.env.PORT, 10) || 3000;

exports.MONGODB_URI = process.env.MONGODB_URI;

exports.ACCESS_KEY = process.env.ACCESS_KEY || 'access key';
exports.REFRESH_KEY = process.env.REFRESH_KEY || 'refresh key';
exports.VERIFY_EMAIL_KEY = process.env.VERIFY_EMAIL_KEY || 'verify mail key';

exports.MAIL_USERNAME = process.env.MAIL_USERNAME;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
exports.OAUTH_CLIENTID = process.env.OAUTH_CLIENTID;
exports.OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
exports.OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
exports.CLIENT_PORT = process.env.CLIENT_PORT;

