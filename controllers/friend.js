const { ObjectID } = require("bson");
const  { User: userModel } = require("../models/user");
const { updateUser } = require("./user");

const sendFriendRequest = async (user, friendIds) => {
    const now = Date.now();
    const { _id, firstName, middleName, lastName } = user;
    const userFullName = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
    const userDetails = {
        id: _id,
        name: userFullName,
        sentBy: _id,
        addedAt: now
    }

    friendIds = friendIds.map(f => new ObjectID(f));
    const friendsData = await new userModel().getByIds(friendIds);
    const friendDetails = [];
    for(const friend of friendsData) {
        const { _id:friendId, firstName, middleName, lastName } = friend;
        const name = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
        friendDetails.push({
            id: friendId,
            name,
            sentBy: _id,
            addedAt: now
        });
    }
    await new userModel().addUserToPendingFriends(
        userDetails, 
        friendDetails
    );
    return {
        statusCode: 200,
        message: "sent successfully"
    }
}

//TESTME: IN PROGRESS
const responseFriendRequest =  async (user, friendId, response = "") => {
    if(response.toUpperCase() === "ACCEPTED") {
        const now = Date.now();
        const { _id, firstName, middleName, lastName } = user;
        const userFullName = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
        const userDetails = {
            id: _id,
            name: userFullName,
            sentBy: new ObjectID(friendId),
            addedAt: now
        }
        const friendsData = await new userModel().getById(new ObjectID(friendId));
        const { 
            firstName: ffirstName, 
            middleName: fmiddleName, 
            lastName: flastName 
        } = friendsData;
        const friendName = `${ffirstName} ${fmiddleName ? fmiddleName : ""} ${flastName}`;
        const friendDetails = {
            id: friendsData._id,
            name: friendName,
            sentBy: new ObjectID(friendId),
            addedAt: now
        };
        await new userModel().acceptRequest(userDetails,friendDetails);
    } else {
        await new userModel().rejectRequest(user._id, new ObjectID(friendId));
    }
    return {
        statusCode: 200,
        message: "updated successfully"
    }
}
module.exports = { sendFriendRequest, responseFriendRequest };