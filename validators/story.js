const Joi = require("joi");

exports.postStoryValidator = Joi.object({
    story: Joi.string().required(),
    status: Joi.string().required()
});