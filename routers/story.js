const express = require("express");
const router = express.Router();
const { ObjectID } = require("bson");


//for creating new stories
router.get('/new',  (req, res)=>{
    try{
        res.render('new-stories', {
            layout: 'homepageLayout',
            data
        });
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});

//for posting new stories
router.post('/new',  (req, res)=>{
    try{
       
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});

module.exports = router;