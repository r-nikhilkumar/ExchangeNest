var express = require('express');
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const bcryptjs = require('bcryptjs')
const JWT = require('jsonwebtoken');
const Fetchuser = require('../middleware/Fetchuser');
const multer = require('multer')
const path = require('path')

/* signup */

const SECRETKEY_SIGNIN = "nikhilkumaristhemostsuccessfulperson"
router.post("/signup", [
  body('email').isEmail().withMessage("Enter valid email!"),
  body("password").isLength({ min: 4 }).withMessage("Password length should be minimum of 4")
], async (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(401).send({ errors: err.array() })
      return;
    }
    const check = await user.findOne({email:req.body.email})
    if(check){
      res.status(400).send({message:"user already exists!"})
      return;
    }
    const salt = await bcryptjs.genSalt(10)
    const secPass = await bcryptjs.hash(req.body.password, salt);
    let u;
    u = await user.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: secPass
    })
    const data = {
      user: {
        id: u.id
      }
    }
    const jwt_signin_res_token = JWT.sign(data, SECRETKEY_SIGNIN);

    res.status(200).send({ authToken: jwt_signin_res_token, message: "registered successfully!" })
  }
  catch (err) {
    res.status(400).send({ message: err.message })
  }

});


// login
router.post('/login', async (req, res) => {
  try {
    let userData = req.body;
    const checkCredentials = await user.findOne({ email: userData.email })
    const data = {
      user:{
        id:checkCredentials.id
      }
    }
    const jwt_login_res_token = JWT.sign(data, SECRETKEY_SIGNIN);
    if (!checkCredentials) {
      res.status(400).send({
        message: 'Wrong credentials'
      })
    }
    else {
      const check = await bcryptjs.compare(userData.password, checkCredentials.password)
      if (checkCredentials.email === userData.email && check) {
        // console.log(bcryptjs.compare(userData.password, checkCredentials.password))
        res.status(200).send({
          message: "Login Successfull",
          authToken: jwt_login_res_token,
        })
        // res.redirect('https://youtube.com')
      }
      else {
        res.status(401).send({
          message: 'Wrong credentials'
        })
      }
    }
  } catch (error) {
    res.send(error.message)
  }
})


// fetchuser

router.post('/fetchuser',Fetchuser,async (req, res)=>{
  try {
    const id = req.user.id;
    const u = await user.findOne({_id:id}).select('-password')
    res.status(200).send({userData: u})
  } catch (error) {
    res.status(400).send({message: error})
  }
})


// user Image:
// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: './public/upload/images',
  filename: function (req, file, cb) {
      cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
  }
});

// Upload middleware using Multer
const upload = multer({ storage: storage });

// POST endpoint for uploading profile picture
router.post('/upload', [Fetchuser ,upload.single('profilePic')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileName = req.file.filename;
    const id = req.user.id
    // console.log(id)
    const filePath= `http://localhost:3001/userimages/${fileName}`
    // Handle file path and send response as needed
    const u = await user.findOne({_id: id})
    u.set({image:filePath})
    await u.save()
    res.status(200).json({ filePath });
  } catch (error) {
    res.status(400).send({filePath:error})
  }
});

router.post('/update', Fetchuser, async(req, res)=>{
  const id = req.user.id;
  const u = await user.findOne({_id: id})
  const resUser = req.body
  if(resUser.name!=u.name){
    u.set({name:resUser.name})
  }
  if(resUser.email!=u.email){
    u.set({email:resUser.email})
  }
  if(resUser.contact!=u.contact){
    u.set({contact:resUser.contact})
  }
  await u.save()
  res.status(200).send({message:"saved successfully!"})
})

router.post('/forgot_password', async(req, res)=>{
  let u = await user.findOne({email: req.body.email})
  if(!u){
    res.status(400).send("Type a valid email")
    return;
  }

  const data = {
    user: {
      id:u.id
    }
  }
  const jwt_signin_res_token = JWT.sign(data, SECRETKEY_SIGNIN);

  res.status(200).send({message: "user found!", authToken:jwt_signin_res_token})
})

router.post('/reset_password', Fetchuser, async(req, res)=>{
  try {
    const id = req.user.id;
    let u = await user.findOne({_id: id})
    if(!u){
      res.status(400).send({message:"session expired"})
      return;
    }
    const salt = await bcryptjs.genSalt(10)
    const newPassword =await  bcryptjs.hash(req.body.password, salt)
    u.set({password:newPassword})
    await u.save()
    res.status(200).send({message:"Password reset successfully!"})
  } catch (error) {
    res.status(400).send({message:"session expired"})
  }

})

module.exports = router;
