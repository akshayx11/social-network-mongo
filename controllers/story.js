
const {Story: storyModel} =  require('../models/story');


const createStory = async (user, storyDetails) => {
    const { story, status } = storyDetails;
    const {
        firstName,
        middleName,
        lastName,
        _id: userId
    } = user;
    const now = Date.now();
    const userFullName = `${firstName} ${middleName ? middleName : ""} ${lastName}`;
    const author = {
        id: userId,
        name: userFullName
    }
    const storyData = {
        story,
        status,
        createdAt: now,
        updatedAt: now,
        author
    };
    await new storyModel().create(storyData);
    return {
        statusCode: 200,
        message: "Successfully saved"
     }
};

module.exports = {
    createStory
}