const crypto = require("crypto");
const {User: userModel} = require("../models/user");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const secretKey = process.env.SECRET_AUTH_KEY;

const encryptData = plainText =>{
    const encCipher =  crypto.createCipher('aes-128-cbc', secretKey);
    let encryptText = encCipher.update(plainText, 'utf8', 'hex');
    encryptText += encCipher.final('hex');
    return encryptText;
};

const decryptData = encryptText => {
    const decCipher =  crypto.createDecipher('aes-128-cbc', secretKey);
    let decryptText = decCipher.update(encryptText, 'hex', 'utf8');
    decryptText += decCipher.final('utf8');
    return decryptText;
};

const generateJwtToken = payload => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '7d' });
}
const decryptJwtToken = payload => {
    return jwt.verify(payload, TOKEN_SECRET);
}

const authorizeUser = async creds =>{
    let {email, password} = creds;
    password = encryptData(password);
    const data =  await new userModel().getByEmailAndPassword(email, password);
    if(!data){
        return {
            statusCode: 403,
            message: "invalid email or password"
        };
    }
    const token = generateJwtToken({email: data.email, userId: `${data._id}`});
    data.token = token;
    return {
        statusCode: 200,
        data
    };
}
module.exports = {
    encryptData, 
    decryptData, 
    authorizeUser, 
    generateJwtToken,
    decryptJwtToken
};