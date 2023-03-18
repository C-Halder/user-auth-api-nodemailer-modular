const jwt = require("jsonwebtoken")
const config = require("../config/config")

const verifyToken = async (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["access-token"]
    if(!token){
        return res.status(403).json({status: false, message: "token is required!!"})
    }
    try{
        const decoded = jwt.verify(token, config.sec_key)
        req.user = decoded;
    }catch(exc){
        return res.status(401).json({status: false, message: "invalid token access"})
    }
    return next()
}

module.exports = verifyToken;