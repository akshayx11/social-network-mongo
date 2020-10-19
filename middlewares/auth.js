
const { decryptJwtToken } = require("../controllers/auth");
const { User: userModel } = require("../models/user");


const authMiddleWare =  async (req, res, next) => {
    try {
        const {email, userId } = decryptJwtToken(req.headers.authorization) || {};
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