const winston = require('winston');
const { omit } = require('lodash');
const { LOG_LEVEL, LOG_OUTPUT_JSON } = require('../config/environment');

const {
    combine, timestamp, colorize, align, printf, json,
} = winston.format;

let format;

if (LOG_OUTPUT_JSON) {
    format = combine(
        timestamp(),
        winston.format((info) => {
            if (!info.stringData) {
                info.stringData = JSON.stringify(omit(info, ['timestamp', 'level', 'message']));
            }
            return info;
        })(),
        json(),
    );
} else {
    format = combine(
        timestamp(),
        colorize(),
        align(),
        printf((info) => `${info.timestamp} ${info.level} ${info.message} ${JSON.stringify(
            omit(info, ['timestamp', 'level', 'message']),
        )}`),
    );
}

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format,
    transports: [new winston.transports.Console()],
});

module.exports = logger;
