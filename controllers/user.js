const  { User: userModel } = require("../models/user");


const registerUser = async user => {
    // check if user exists
    const userDetails = await new userModel().getUserByEmail();
    console.log(JSON.stringify(userDetails));
    if(userDetails) {
        return {
            error: "Forbidden",
            statusCode: 403,
            message: "User already exists",
            data: user
        }
    }
    const result = await new userModel().createOrUpdate(user);
    delete user.password;
    return {
        statusCode: 200,
        message: "User registred successfully",
        data: result
    }
}

const getUserById = async userId => 
{
    const userData = await new userModel().getById(userId);
    if(!userData){
        return {
            statusCode: 404,
            message: "user not found"
        };
    }
    delete userData.password;
    return {
        statusCode: 200,
        data: userData
    };
    
}
module.exports = { registerUser, getUserById };