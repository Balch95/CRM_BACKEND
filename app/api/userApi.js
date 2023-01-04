const express = require("express");
const router = express.Router();

const user = require('../controllers/user.controller');

router.post('/singup', function(req, res){
    user.add(req.body, function(err, user){
        if(err){
            res.status(404);
            res.json({
                error: "User not created"
            })
        } else {
            res.json({
                singup: true, 
                username: user
            })
        }
    })
});

router.post('/login', function(req, res){
    user.login(req.body, function(err, data){
        if(err){
            res.status(404);
            res.json({
                error: "User not logged"
            })
        } else if(data){
            res.json({success: true, jwt: data.token, userPermision: data.permision})
        } else {
            res.status(201)
            res.json({success: false, message:"Username or password do not match"})
        }
    })
})

module.exports = router