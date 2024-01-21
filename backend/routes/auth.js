var express = require('express');
const user = require('../models/user');
const { body } = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.post("/signup",[
  body('email').isEmail(),
  body("password").isLength({ min: 4 })
],async function(req, res, next) {
  const check = await user.findOne({email:req.body.email})
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
  
});

module.exports = router;
