const httpStatus = require('http-status');
const ErrorCode = require('../../config/errors');

class APIError extends Error {
    /**
     *
     * @param {string} message
     * @param {errors} errors
     * @param {string} stack
     * @param {number} errorCode
     * @param {boolean} isPublic
     * @param {object} messageData
     * @param {number} status
     */
    constructor(
        message,
        errors,
        stack,
        errorCode,
        status = httpStatus.INTERNAL_SERVER_ERROR,
        isPublic = false,
        messageData = null,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.errors = errors;
        this.stack = stack;
        if (errorCode === 0) {
            this.errorCode = status >= 500 ? ErrorCode.SERVER_ERROR : ErrorCode.VERIFY_FAILED;
        } else {
            this.errorCode = errorCode;
        }
        this.messageData = messageData;
    }
}

module.exports = APIError;
