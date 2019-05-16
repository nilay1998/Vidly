const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/user')


router.post('/', async (req,res)=>
{
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalod Email or Password.');

    const validPassword=await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password');
    
    const token=user.generateAuthToken();

    res.send(token);
});

module.exports=router;