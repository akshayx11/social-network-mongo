const mongoose = require("mongoose");

const StoryObj = mongoose.model('Story', {
  storyTitle: String ,
  storyDesc: String ,
  postedOn:String,
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  postedBy:String,
  updatedAt: Number,
  isDeleted: { type: Number, default:0 },
  // likeBy: [ {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // }],
  // disLikeBy: [ {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // }],
});

module.exports = {
  newStory: function (storyObj) {
      Story = new StoryObj(storyObj);
      return Story.save();
  },
  allStory: async function(){
    let data =  await StoryObj.find({}).lean();
    return data;
  }
  
}








