const { Joi } = require('express-validation');

exports.register = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
        salt: Joi.string().required()
    })
};


exports.login = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

exports.refreshToken = {
    body: Joi.object({
        refresh_token: Joi.string().required(),
    }),
};
