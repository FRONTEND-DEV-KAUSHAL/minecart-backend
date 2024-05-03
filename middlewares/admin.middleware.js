const jwt = require('jsonwebtoken')


const adminMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(decoded.role !== 'Admin'){
            res.status(401).send({message: "You cannot access this route", success: false})
            return
        }
        req.user = decoded;
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: "Invalid token" });
      }        
    
}


module.exports = { adminMiddleware }