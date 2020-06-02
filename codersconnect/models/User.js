const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//Schema of user
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        required:true
    }
})

const User = mongoose.model('users',userSchema)

module.exports = User