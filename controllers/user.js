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
    user.dpURL = `https://avatars.dicebear.com/api/${user.gender}/${
        user.firstName}${user.lastName}${Date.now()}.svg?mood[]=happy&w=100&h=100`;
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

const getAllUsers = async user => {
    const { pendingFriends = [], friends = [] } = user;
    //FIXME:  user mongo aggregate query
    const pf = pendingFriends.map(({id, sentBy})=> {
        return {
            id: `${id}`,
            sentBy
        }
    });
    const fr = friends.map(({id}) => `${id}`);
    const allUsers = await new userModel().getAllUsers(user._id);
    for(const u of allUsers){
        const { _id } = u;
        const pfDetails = pf.find( ({id}) => `${_id}` === id);
        if(pfDetails) {
            if(`${pfDetails.sentBy}` ===  `${user._id}`){
                Object.assign(u, {friendStatus: "Pending"});
            }else{
                Object.assign(u, {friendStatus: "Response"});
            }
        } else if(fr.includes(`${_id}`)) {
            Object.assign(u, {friendStatus: "Accepted"});
        } else {
            Object.assign(u, {friendStatus: "Open"});
        }
    }
    return {
       statusCode: 200,
       data: allUsers
    }
}
module.exports = { registerUser, getUserById, updateUser, getAllUsers };