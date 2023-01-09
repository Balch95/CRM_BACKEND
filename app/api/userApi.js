const express = require("express");
const router = express.Router();

const user = require('../controllers/user.controller');
const authLevel1 = require("../middlewares/authLevel1");
const authLevel2 = require("../middlewares/authLevel2");
const authLevel3 = require("../middlewares/authLevel3");


router.post('/singup',authLevel3, function(req, res){
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
            res.json({success: true, jwt: data.token, userPermission: data.permission})
        } else {
            res.status(201)
            res.json({success: false, message:"Username or password do not match"})
        }
    })
})

router.get('/all',authLevel1, function(req, res){
    user.all(function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "User don't exist"
            })
        } else {
            res.json(user)
        }
    });
})

router.put('/update/:id',authLevel3, function(req,res){
    user.update(req.params.id, req.body, function(err, client){
        if(err){
            res.status(404);
            res.json({
                error: "User not update"
            })
        } else {
            res.json({
                message: "User update"
            })
        }
    })
});

router.delete('/remove/:id',authLevel3, function(req, res){
    user.remove(req.params.id, function(err, client){
        if (err) {
            res.status(404);
            res.json({
                error: "User not remove"
            })
        } else {
            res.json({
                message: "User remove"
            })
        }
    });
});


module.exports = router