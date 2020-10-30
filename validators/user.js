const Joi = require("joi");

exports.userSignupValidate = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(""),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    dpURL: Joi.string(),
    mobileno: Joi.string(),
    dob: Joi.number().required(),
    city : Joi.string().required(),
	state : Joi.string().required(),
	country : Joi.string().required(),
    gender: Joi.string().required()
});

exports.userLoginValidate = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

exports.userUpdateValidate = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(""),
    lastName: Joi.string().required(),
    dpURL: Joi.string(),
    mobileno: Joi.string(),
    city : Joi.string().required(),
	state : Joi.string().required(),
	country : Joi.string().required()
});