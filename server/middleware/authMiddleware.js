const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message: "Access denied"});
    }
    
    try {
        // Extract the token if it has the Bearer prefix
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
       res.status(401).json({message: "Invalid Token"});
    }
}

module.exports = verifyToken;