const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const {} = require("../keys")



  exports.signup = (req, res) => {
    var {name, email, password} = req.body
    if(!email || !password || !name){
      return   res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email: email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
	password=hashedpassword
          const user = new User({
            email,
            password,
            name
        })
        user.save()
        .then(user=> {
            res.json({message:"saved successfully"})
        })
        .catch(err => {
            console.log(err)  
        })
    })
    .catch(err => {
            console.log(err)  
        })
}
    )}

    exports.signin = (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email} = savedUser
               res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

   