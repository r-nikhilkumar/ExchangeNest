var express = require('express');
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
var router = express.Router();

/* signup */
router.post("/signup",[
  body('email').isEmail(),
  body("password").isLength({ min: 4 })
],async function(req, res, next) {
  const check = await user.findOne({email:req.body.email})
  try{
    if(check){
      res.status(400).send({message : 'user exist!'})
    }else{
      const u = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      res.status(200).send({message:"registered successfully!"})
    }
  }catch(err){
    console.log(err)
  }
  
});


// login
router.post('/login', async (req, res)=>{
  let userData= req.body;
  const checkCredentials = await user.findOne({email:userData.email})
  if(!checkCredentials){
    res.status(400).send({
      message:'User not found'
    })
  }
  else{
    if(checkCredentials.email===userData.email && checkCredentials.password === userData.password){
      res.status(200).send({
        message:"Login Successfull",
        data: userData
      })
    }
    else{
      res.status(401).send({
        message:"Wrong password",
      })
    }
  }
})






module.exports = router;
