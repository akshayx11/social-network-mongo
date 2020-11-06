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
      dpURL: String,
      title: String,
      firstName: String,
      middleName: String,
      lastName: String,
      gender: String,
      dob: Number,
      email: { type: String, lowercase: true },
      mobileno: String,
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

    //needs to add pagination
    getAllUsers(userId){
      return this.User.find({status: "active", _id: {$ne: userId }}, {password: 0}).lean();
    }
    //Friends
    async addUserToPendingFriends(user, friends){
      await this.User.update(
        {
          _id: user.id,
          "pendingFriends.id": { $nin: friends.map(({id}) => id) }
        },
        {
          $addToSet: {
            pendingFriends: { $each: friends }
          }
        }
      );
      await this.User.update(
        {
          _id: { $in: friends.map(({id}) => id) },
          "pendingFriends.id": { $ne: user.id }
        },
        {
          $addToSet: {
            pendingFriends: user
          }
        }
      );
    }

    //FIXME and TESTME
    async acceptRequest(user, friend) {
      //pull from pendingFriends of user
      await this.User.update(
        {
          _id: user.id
        },
        {
          $pull: {
            pendingFriends: {
              $elemMatch: {
                id: friend.id
              }
            }
          }
        }
      );
      //pull from pendingFriends from friend
      await this.User.update(
        {
          _id: friend.id
        },
        {
          $pull: {
            pendingFriends: {
              $elemMatch: {
                id: user.id
              }
            }
          }
        }
      );

      //push to friends array of user
      await this.User.update(
        {
          _id: user.id
        },
        {
          $addToSet: {
            pendingFriends: friend
          }
        }
      );
      //push to frineds array of friend
      await this.User.update(
        {
          _id: friend.id
        },
        {
          $addToSet: {
            pendingFriends: user
          }
        }
      );
    }  

  async rejectRequest(userId, friendId) {
    //pull from pendingFriends of user
    await this.User.update(
      {
        _id: userId
      },
      {
        $pull: {
          pendingFriends: {
            $elemMatch: {
              id: friendId
            }
          }
        }
      }
    );
    //pull from pendingFriends from friend
    await this.User.update(
      {
        _id: friendId
      },
      {
        $pull: {
          pendingFriends: {
            $elemMatch: {
              id: userId
            }
          }
        }
      }
    );
  }
}  

  exports.User = User;
  module.exports = {friendsSchema}