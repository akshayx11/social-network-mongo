const express = require("express");
const router = express.Router();
const { getUserById, updateUser, getAllUsers } = require("../controllers/user");
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
        const { data } =  await getUserById(userId);
        res.render('profile', {
            layout: 'homepageLayout',
            data
        });
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});

router.get('/people/:userType', async(req, res) => {
    try {
        const { userType = "all" } = req.params;
        const { data } =  await getAllUsers(req.user, userType);
        res.render('people', {
            layout: 'homepageLayout',
            data
        });
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { data } =  await getUserById(new ObjectID(id));
        res.render('viewprofile', {
            layout: 'homepageLayout',
            data
        });
    }catch(e){
        res.send("Error occured: "+ e);
    }
});
exports.userRouter = router;