const Joi = require("joi");
const { ObjectID } = require("bson");

//FIXME: frined schema changed
exports.friendRequestValidator = Joi.object({
   friendIds: Joi.array().items(ObjectID)
});