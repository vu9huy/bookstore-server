const { ValidationError } = require('express-validation');
const httpStatus = require('http-status');
const { pick } = require('lodash');
const APIError = require('../common/error/api.error');
const logger = require('../common/logger');
const { NODE_ENV } = require('../config/environment');
const ErrorCode = require('../config/errors');

const getMessageOfValidationError = (error) => {
    try {
        const { details } = error;
        if (details.body !== undefined && details.body !== null && details.body.length > 0) {
            return details.body[0].message;
        } if (details.query !== undefined && details.query !== null && details.query.length > 0) {
            return details.query[0].message;
        } if (details.params !== undefined && details.params !== null && details.params.length > 0) {
            return details.params[0].message;
        } if (details.headers !== undefined && details.headers !== null && details.headers.length > 0) {
            return details.headers[0].message;
        }
    } catch (error) {
        logger.error('Error during get message from ValidationError', error);
    }
    return 'common.validate_fail';
};

// eslint-disable-next-line no-unused-vars
exports.handler = (err, req, res, next) => {
    const { status = httpStatus, errorCode = 1 } = err;
    const response = {
        error_code: errorCode,
        message: err.message ? err.message : httpStatus[status],
        data: null,
        stack: err.stack,
        errors: err.errors,
    };
    if (NODE_ENV !== 'development') {
        delete response.stack;
        delete response.errors;
    }
    res.status(status);
    res.json(response);
    res.end();
};

exports.converter = (err, req, res, next) => {
    let convertedError = null;
    if (err instanceof ValidationError) {
        convertedError = new APIError(getMessageOfValidationError(err), err.details, err.error, ErrorCode.VERIFY_FAILED, httpStatus.BAD_REQUEST);
    } else if (err instanceof APIError) {
        convertedError = err;
    } else {
        convertedError = new APIError(err.message, null, err.stack, ErrorCode.SERVER_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    if (convertedError.status >= httpStatus.INTERNAL_SERVER_ERROR) {
        logger.error('Process request error:', {
            stringData: JSON.stringify(err),
            err,
            ...pick(req, ['originalUrl', 'body', 'rawHeaders']),
        });
    }
    return this.handler(convertedError, req, res, next);
};

exports.notFound = (req, res, next) => {
    const err = new APIError('Not Found', null, '', ErrorCode.REQUEST_NOT_FOUND, httpStatus.NOT_FOUND);
    return this.handler(err, req, res, next);
};
