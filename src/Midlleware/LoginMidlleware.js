const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ Message: "Access Denied" })
    }
    const token = authorizationHeader.replace("Bearer ", "")
    jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
        if (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ Message: "Access Denied" })
        }
        next();
    })

}
module.exports = verifyToken;