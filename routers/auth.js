const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user");
const { responseHandler } = require("../utils/common");
const { userSignupValidate, userLoginValidate } = require("../validators/user");
const { jwtValidator } = require("../validators/auth");
const { generateJwtToken } = require("../controllers/auth");
const {authorizeUser} =  require("../controllers/auth");

router.post('/signup', async (req, res) => {
    try {
        const { error, value } = userSignupValidate.validate(req.body);
        if (error) {
            return res.boom.badRequest(error.message);
        }
        const {
            data,
            statusCode,
            message
        } = await registerUser(value);
        responseHandler({
            res,
            statusCode,
            data,
            message
        });
    } catch (e) {
        res.send("Error occured: " + e);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error, value } = userLoginValidate.validate(req.body);
        if (error) {
            return res.boom.badRequest(error.message);
        }
        const {
            data,
            statusCode,
            message
        } = await authorizeUser(value);
        responseHandler({
            res,
            statusCode,
            data,
            message
        });
    } catch (e) {
        res.send("Error occured: " + e);
    }
});

router.post("/jwt", (req, res, next) => {
    try {
        const { error } = jwtValidator.validate(req.body);
        if (error) {
            res.boom.badRequest(error);
        }
        res.send(generateJwtToken(req.body));
    } catch (e) {
        res.send("Error occured: " + e);
        next(e);
    }
});
exports.authRouter = router;