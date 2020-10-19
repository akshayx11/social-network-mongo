const mongoose = require("mongoose");

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
      status: String
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
    getById(id) {
        return this.User.findById(id, { password: 0 }).lean();
    }
    getByEmailAndPassword(email, password) {
      return this.User.findOne({email, password}, { password: 0}).lean();
    }
  }  

  exports.User = User;