const jwt = require('jsonwebtoken');
const User = require('../model/User')

module.exports= function(req, res, next) {
    try{
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).json({message: "Access denied"})

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        
        req.user = decoded;
       

        User.findById(req.user._id).exec(function(err, user){
            if(user.permission.includes("user")){
                console.log("user")
                next();
            }
            else{
                res.status(201)
                res.json({message: "Access denied"})
            }
        })
    } catch{
        res.status(400).json({message:"Invalid token"})
    }
}