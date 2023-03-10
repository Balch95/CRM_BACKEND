const User = require('../model/User')
const bcrypt= require('bcrypt')

function userAdd(data,cb){
    let newUser = new User(data);
    
    newUser.save(function(err, user){
        if(err){
            cb(err)
        } else {
            cb(null, user)
        }
    })
}

function userLogin(data, cb) {
    User.findOne({username: data.username}).exec(function(err, user){
        if(err) {
            cb(err);
            return;
        }
 
        if(!user){
            cb(null, user);
            return;
        }
 
 
        bcrypt.compare(data.password, user.password, function(err, logged) {
            if (err) {
                cb(err);
            } if (logged) {
                const data = { token :user.generateAuthToken(), permission: user.permission}
                cb(null, data);
            } else {
                cb(null, null);
            }
        })
    })
}

function userAll(cb) {
    User.find().select("-password").exec(function (err, user) {
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    });
};

function userUpdate(id, data, cb){
    User.updateOne({_id: id}, data, function(err, client){
        if(err){
            cb(err);
        } else{
            cb(null, client);
        }
    })
}

function userRemove (id, cb){
    User.deleteOne({_id: id}, function(err, client){
        if(err){
            cb(err);
        } else {
            cb(null, client)
        }
    });
}

module.exports = {
    add: userAdd,
    login: userLogin,
    all: userAll,
    update: userUpdate,
    remove: userRemove
}