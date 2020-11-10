const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const authorSchema = mongoose.Schema({
  id: ObjectID,
  name: String
},{
  _id: false
})
const storySchema = mongoose.Schema(
    {  
        content: String,
        author: authorSchema,
        createdAt: Number,
        updatedAt: Number,
        status: String    
    }
  );
  
  class Story {
    constructor() {
      this.Story = mongoose.model("Story", storySchema, "Stories");
    }
    create(story) {
        return this.Story.insert(story);
    }

    update(_id, userId, storyData) {
        return this.Story.update(
            {
                _id,
                "author.id": userId
            },
            {
                $set: {
                    ...storyData,
                    updatedAt: Date.now(),
                }
            }
        );
    }
    getByAuthorId(id) {
        this.Story.find({
            "author.id": id,
            status: "active"
        });
    }
    getById(id, option = {}) {
        return this.Story.findOne({_id: id, status:"active"}, option).lean();
    }
    //needs to add pagination
    getAllPosts(){
      return this.Story.find( {
        status: "active"
      })
      .limit(100) //need to handle by pagination, currently limited to 100 recent posts
      .lean();
    }

    archivePostById(storyId, authorId) {
        return this.Story.updateOne(
            {
                _id: storyId,
                "author.id": authorId
            },
            {
                $set: {
                    status: "archived"
                }
            }
        );
    }

    deletePostById(storyId, authorId){
        return this.Story.updateOne(
            {
                _id: storyId,
                "author.id": authorId
            },
            {
                $set: {
                    status: "deleted"
                }
            }
        );
    }
}  

  exports.Story = Story;