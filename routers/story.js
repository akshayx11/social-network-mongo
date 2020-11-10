const express = require("express");
const { createStory } = require("../controllers/story");
const { responseHandler } = require("../utils/common");
const { postStoryValidator } = require("../validators/story");
const router = express.Router();


router.post('/', async(req, res) => {
    try {
        const { error, value: storyDetails } =  postStoryValidator.validate(req.body);
        if(error) {
            res.boom.badData(error);
        }
        const {
            data,
            statusCode,
            message
        } = await createStory(req.user, storyDetails);
        responseHandler({
            res,
            statusCode,
            data,
            message
        });
    }catch(e) {
        res.send("Error occured: " + e);
    }
});
router.get('/', async (req, res) => {
    try {
        res.render('storyEditor', {
            layout: 'editorLayout'
        });
    }catch(e) {
        res.send("Error occured: "+ e);
    }
});

exports.storyRouter = router;