const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config');
const Joi=require('joi');

const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:
    {
        type:String,
        requird:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User=mongoose.model('User', userSchema);

function validateUser(user)
{
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

module.exports.User=User;
module.exports.validate=validateUser;