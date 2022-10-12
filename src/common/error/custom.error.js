const httpStatus = require('http-status');
const APIError = require('./api.error');
const ErrorCode = require('../../config/errors');

exports.UnAuthorized = new APIError('UnAuthorized', null, '', ErrorCode.REQUEST_UNAUTHORIZED, httpStatus.UNAUTHORIZED);

exports.NotVerifyEmail = new APIError('NotVerifyEmail', null, '', ErrorCode.AUTH_ACCOUNT_NOT_VERIFY_EMAIL, httpStatus.UNAUTHORIZED);

exports.Forbidden = new APIError('Forbidden', null, '', ErrorCode.REQUEST_FORBIDDEN, httpStatus.FORBIDDEN);

exports.UpdateFail = new APIError('Not record updated', null, '', ErrorCode.REQUEST_VALIDATION_ERROR, httpStatus.BAD_REQUEST);

exports.DeleteFail = new APIError('Not record updated', null, '', ErrorCode.REQUEST_VALIDATION_ERROR, httpStatus.BAD_REQUEST);

exports.NotFound = new APIError('Not found', null, '', ErrorCode.REQUEST_NOT_FOUND, httpStatus.NOT_FOUND);
