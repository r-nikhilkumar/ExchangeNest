var express = require('express');
const user = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.post("/signup" ,async function(req, res, next) {
  const check = await user.findOne({email:req.body.email})
  if(check){
    res.status(400).json('user exist')
  }else{
    const u = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json(u)
  }
  
});

module.exports = router;
