const crypto = require("crypto");
const { getByEmailAndPassword } = require("../models/user");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "social2020";

const secretKey = "akshaygupta.me";

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
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '18000s' });
}
const decryptJwtToken = payload => {
    return jwt.verify(payload, TOKEN_SECRET);
}

const authorizeUser = async creds =>{
    let {email, password} = creds;
    password = encryptData(password);
    const [data] =  await getByEmailAndPassword(email, password);
    if(!data){
        return {
            statusCode: 403,
            message: "invalid email or password"
        };
    }
    const token = generateJwtToken({email: data.email, userId: data.id});
    data.token = token;
    delete data.password;
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