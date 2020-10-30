const  { User: userModel } = require("../models/user");
const  { ObjectID } =  require("bson");
const { encryptData } = require("./auth");
const registerUser = async user => {
    // check if user exists
    const userDetails = await new userModel().getUserByEmail(user.email);
    if(userDetails) {
        return {
            error: "Forbidden",
            statusCode: 403,
            message: "User already exists"
        }
    }
    user.status = "active";
    user.createdAt = Date.now();
    user.updatedAt =  Date.now();
    user.password = encryptData(user.password);
    const result = await new userModel().createOrUpdate(user);
    return {
        statusCode: 200,
        message: "User registred successfully",
        data: result
    }
}

const getUserById = async userId => 
{
    const userData = await new userModel().getById(new ObjectID(userId));
    if(!userData){
        return {
            statusCode: 404,
            message: "user not found"
        };
    }
    return {
        statusCode: 200,
        data: userData
    };
    
}

const updateUser = async user => {
    const userData = await new userModel().getById(user._id);
    if(userData){
        return {
            statusCode: 404,
            message: "user not found"
        };
    }
    user.updatedAt =  Date.now();
    const result = await new userModel().createOrUpdate(user);
    return {
        statusCode: 200,
        message: "User updated successfully",
        data: result
    }
}
module.exports = { registerUser, getUserById, updateUser };