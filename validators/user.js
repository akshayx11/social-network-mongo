const Joi = require("joi");

exports.userSignupValidate = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    dpURL: Joi.string(),
    mobileno: Joi.string(),
    dob: Joi.number().required(),
    city : Joi.string(),
	state : Joi.string(),
	country : Joi.string(),
    gender: Joi.string().required()
});

exports.userLoginValidate = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});