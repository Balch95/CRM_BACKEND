const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://0.0.0.0:49153/crm_database', { useNewUrlParser: true, useUnifiedTopology: true });

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{type: String, require: true},
    phone:{type: Number, require: true},
    permision: {type: Array, require: true}
})

schemaUser.pre('save', function(next){
    let user = this;

    if(!user.isModified('password')) return next();
    
    bcrypt.genSalt(Number(process.env.SALT), function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

schemaUser.methods.generateAuthToken = function() {
    
    const token = jwt.sign({ _id:this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

    return token;
}

schemaUser.plugin(uniqueValidator);

module.exports = mongoose.model("User", schemaUser);