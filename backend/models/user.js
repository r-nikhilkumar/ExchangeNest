const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    image: {type: String, default:null},
    email: { type: String, required: true, unique:true},
    contact:{type: Number, required: true, unique:true},
    password:{type: String, required:true},
    createdDate: {type:Date, default: Date.now}
})
user = mongoose.model("user", userSchema);
// user.createIndexes();
module.exports = user;
