const express = require("express");
const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User2  = require("../models/user2.model")

authRouter.post('/user/signup', async (req, res) => {
    const {name , email , password} = req.body;
    try{
        const isAlreadyExists = await User.findOne( {email} )
        const encryptPassword = await bcryptjs.hash(password , 12);
        
        if(isAlreadyExists) {
            return res.status(400).json({
            "code" : "400",
            "message" : "User already exists", 
            })
        }else{
            const newUser = User({
                "name" : name,
                "email" : email,
                "password" : encryptPassword
            })

            user = await newUser.save();
            const token = jwt.sign({id : user._id} , "passKey");
            return res.status(200).json({
            user,
            token,
            "code" : "200",
            "message" : "user signup succesfully"
        })
        } 
     }catch (e){
     res.status(500).send({
      "message" : e.message,
    })
   }
});







// Login User 

 authRouter.post('/user/login' , async (req , res) => {
    try {

        const {email , password} = req.body;    
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                "code" : 401,
                "message" : "user is not exist"
            })
        }
        
        const isValidPassword = await bcryptjs.compare(password,user.password);
        console.log(isValidPassword);

        if(!isValidPassword){
            return res.status(400).json({
                "code" : 400,
                "message" : "email or password is invalid"
            })
        }
        
        const token = jwt.sign({id : user._id} , "passKey");

        return res.status(200).json({
            user,
            token,
            "code" : 200,
            "message" : "logged in succesfully"
        })

    }catch(e){
      console.log(e);
    }
})


// Mobile Otp Login 
authRouter.post('/user/phone/login' , async (req, res)=>{

  try {
    const {mobile} = req.body;

    const alreadyExits = await User2.findOne({mobile})
    const otp =  Math.floor(100000 + Math.random() * 900000);

    if(alreadyExits){
        const user = await User2.findOneAndUpdate(
            { mobile: mobile },         // Filter: Find the user by mobile number
            { $set: { otp: otp } },      // Update: Set the otp field to the new value
            { new: true }                // Options: Return the updated document
        );
       return res.status(200).json (
        {
            user,
            "code"  : "200",
            "message" : "otp recieved successfully"
        }
      )
    }

    const user = User2({
        "mobile" : mobile,
        "otp" : otp
    })
    user.save();
    res.status(200).json({
        user,
        "code" : 200,
        "message" : "Otp recieved successfully"

    })
  } catch(e){
    return res.json({       
        "code" : 500,
        "message" : e.message,
     })
  }

})
// put otp 
authRouter.post('/user/verify/otp' , async (req, res)=>{

   const {mobile , otp} = req.body;

   const user = await User2.findOne({mobile})
   console.log(user)
   console.log(otp)
   console.log(user.otp);
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
   } 

   const token = jwt.sign(mobile , "mobile");

   if(user.otp==otp){
    const user = await User2.findOneAndUpdate({mobile} , 
       {$set : {"otpCount" : "1"}},
       {new : true}
    )
    return res.json({
       user,
       token,
       "code" : "200",
       "message" : "logged in successfully"
    })
   }

   return res.json({
    "code" : "400",
    "message" : "otp is not matched"
 })

})







module.exports = authRouter;


// module.exports = {authRouter , name : "Rohit"};
// can be 
// module.exports = {authRouter  : authRouter , name : "Rohit"};