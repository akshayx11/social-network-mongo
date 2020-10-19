const Joi = require("joi");

exports.jwtValidator = Joi.object({
    email: Joi.string().required(),
    userId: Joi.string().required()
 });