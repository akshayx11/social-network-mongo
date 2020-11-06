
const story= require('../models/story');
const  { User } = require("../models/user");

module.exports = {
    new_story: async function (req) {// For creating new story
      let response;
      try {
        const currentTime = Date.now();
        req.postedOn =currentTime;
        req.updateAt=currentTime;
        //let user = await new userModel().getUserById(req.postedBy);
        let data = await story.newStory(req);
        response = {
          statuscode: 201,
          message: "Story posted successfully",
        };
      } catch (err) {
        response = {
          statuscode: 400,
          message: "Unable to post the story",
        };
      }
      return response;
    },
    update_story: async function (req, res) { //For updating story
        
    },
    get_all_stories: async function () { //  For fetching all story
        let data = await story.allStory();
        return data;
    },
    get_story: async function (req, res) { // For fetching story by id
      
    },
    like_story: async function (req, res) { // For story like
      
    },
    dislike_story: async function (req, res) { // For story dislike
      
    }
  
  };
  