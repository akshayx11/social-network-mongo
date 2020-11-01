const { ObjectID } = require("bson");
const  { User: userModel } = require("../models/user");

const sendFriendRequest = async (user, friendIds) => {
    const now = Date.now();
    const { _id, firstName, middleName, lastName } = user;
    const userFullName = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
    const userDetails = {
        id: _id,
        name: userFullName,
        addedAt: now
    }

    friendIds = friendIds.map(f => new ObjectID(f));
    const friendsData = await new userModel().getByIds(friendIds);
    const friendDetails = [];
    for(const friend of friendsData) {
        const { _id, firstName, middleName, lastName } = friend;
        const name = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
        friendDetails.push({
            id: _id,
            name,
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
            addedAt: now
        }
        const friendsData = await new userModel().getById(friendId);
        const { ffirstName, fmiddleName, flastName } = friendsData;
        const friendName = `${ffirstName} ${fmiddleName ? fmiddleName : ""} ${flastName}`;
        const friendDetails = {
            id: friendsData._id,
            name: friendName,
            addedAt: now
        };
        return await new userModel().acceptRequest(userDetails,friendDetails);
    } else {
        return await new userModel().rejectRequest(user.id, friendId);
    }
}
module.exports = { sendFriendRequest, responseFriendRequest };