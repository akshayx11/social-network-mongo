const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../controllers/user");
const { responseHandler } = require("../utils/common");
const { ObjectID } = require("bson");
const { userUpdateValidate } = require("../validators/user");

router.get('/', async (req, res)=>{
    try{
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
router.put('/', async (req, res)=>{
    try {
        const { error, value: user } = userUpdateValidate.validate(req.body);
        if (error) {
            return res.boom.badRequest(error.message);
        }
        user.email = req.user.email;
        const {
            data,
            statusCode,
            message
        } = await updateUser(user);
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

router.get('/profile', async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { data } =  await getUserById(new ObjectID(userId));
        res.render('profile', {
            layout: 'homepageLayout',
            data
        });
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});
exports.userRouter = router;