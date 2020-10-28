
const { decryptJwtToken } = require("../controllers/auth");
const { User: userModel } = require("../models/user");
const { getCookie } = require("../utils/cookieHandler");

const authMiddleWare =  async (req, res, next) => {
    try {
        const token = getCookie(req.headers.cookie, "token");
        if(!token || token === "undefined") {
            res.boom.unauthorized("Invaild login");
        }
        const {email, userId } = decryptJwtToken(req.headers.authorization || token) || {};
        if(!email || !userId){
            res.boom.unauthorized("Invaild login");
        }
        const user = await new userModel().getById(userId);
        if(!user) {
            res.boom.unauthorized("User not found");
        }
        req.user = user;
        next();
    } catch(e) {
        res.boom.unauthorized(e);
    }
}

exports.authMiddleWare = authMiddleWare;