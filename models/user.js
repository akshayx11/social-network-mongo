const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const friendsSchema = mongoose.Schema({
  id: ObjectID,
  name: String,
  addedAt: Number
},{
  _id: false
})
const userSchema = mongoose.Schema(
    {
      title: String,
      firstName: String,
      middleName: String,
      lastName: String,
      gender: String,
      dob: Number,
      email: { type: String, lowercase: true },
      password: String,
      createdAt: Number,
      updatedAt: Number,
      status: String,
      city: String,
      state: String,
      country: String,
      friends: [friendsSchema],
      pendingFriends: [friendsSchema]
    }
  );
  
  class User {
    constructor() {
      this.User = mongoose.model("User", userSchema, "Users");
    }
    createOrUpdate(user) {
        return this.User.findOneAndUpdate(
          { email: user.email },
          { $set: { ...user } },
          {
            new: true,
            upsert: true
          }
        ).lean();
    }
    getUserByEmail(email){
        return this.User.findOne({email}, {password: 0}).lean();
    }
    getById(id, option = {}) {
        return this.User.findById(id, { password: 0, ...option }).lean();
    }
    getByIds(ids, option = {}) {
      return this.User.find({_id: { $in: ids}}, { password: 0, ...option }).lean();
    }
    getByEmailAndPassword(email, password) {
      return this.User.findOne({email, password}, { password: 0}).lean();
    }

    //Friends
    async addUserToPendingFriends(user, friends){
      await this.User.update(
        {
          _id: user.id 
        },
        {
          $addToSet: {
            pendingFriends: { $each: friends }
          }
        }
      );
      await this.User.update(
        {
          _id: { $in: friends.map(({id}) => id) }
        },
        {
          $addToSet: {
            pendingFriends: user
          }
        }
      );
    }
  }  

  exports.User = User;