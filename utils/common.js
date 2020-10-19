const responseHandler = ({res, data, statusCode, message}) => {
    return res
    .status(statusCode)
    .send({
        statusCode,
        message,
        data
    });
}

module.exports = {responseHandler};