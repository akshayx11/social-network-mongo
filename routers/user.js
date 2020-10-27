const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const { responseHandler } = require("../utils/common");
const { ObjectID } = require("bson");

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

router.get('/profile', async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { data } =  await getUserById(new ObjectID(userId));
        console.log(JSON.stringify(data));
        res.render('profile', {
            layout: 'homepageLayout',
            data
        });
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});
exports.userRouter = router;