const express = require("express");
const { sendFriendRequest, responseFriendRequest } = require("../controllers/friend");
const router = express.Router();
const { responseHandler } = require("../utils/common");
const { friendRequestValidator } = require("../validators/friend");

router.post('/send-request', async (req, res)=>{
    try{
        const { error, value } = friendRequestValidator.validate(req.body);
        if(error){
            return res.boom.badRequest(error);
        }
        const { friendIds = [] } = value;
        const {
            data,
            statusCode,
            message
        } =  await sendFriendRequest(req.user, friendIds); 
        responseHandler({
            res,
            statusCode,
            data,
            message
        });
    }catch(e){
       res.send("Error occured: "+ e);
    }
});
router.put('/response-request', async (req, res)=>{
    try{
        if(error){
            return res.boom.badRequest(error);
        }
        const { response } = req.query;
        const {
            data,
            statusCode,
            message
        } =  await responseFriendRequest(req.user, friendId, response); 
        responseHandler({
            res,
            statusCode,
            data,
            message
        });
    }catch(e){
       res.send("Error occured: "+ e);
    }
});

exports.friendRouter = router;