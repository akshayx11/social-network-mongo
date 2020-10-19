const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
      firstName: String,
      middleName: String,
      lastName: String,
      gender: String,
      dob: Number,
      email: { type: String, lowercase: true },
      password: String,
      createdAt: Number,
      updatedAt: Number,
      status: Number
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
        return this.User.findOne({email}).lean();
    }
    getById(id) {
        return this.User.findById(id);
    }
  }  

  exports.User = User;