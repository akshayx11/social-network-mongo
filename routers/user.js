const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const { responseHandler } = require("../utils/common");

router.get('/', async (req, res)=>{
    try{
        console.log(req.user);
        const { _id } = req.user;
        if(!_id){
            return res.boom.badRequest("Please provide id");
        }
        const {
            data,
            statusCode,
            message
        } =  await getUserById(_id); 
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
exports.userRouter = router;