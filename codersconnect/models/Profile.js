const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        max:40
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status: {
        type:String,
        required:true
    },
    skills :{
        type:[String],
        required:true
    },
    bio:{
        type:String,
    },
    githubusername:{
        type:String
    },
    social:{
        youtube:{
            type:String,
        },
        facebook:{
            type:String,
        },
        instagram:{
            type:String,
        },
        linkedin:{
            type:String,
        }
    },
    date:{
        type:String,
        default:Date.now
    }

})


module.exports = Profile = mongoose.model('profile',ProfileSchema)