const express = require('express')
const router = express.Router();
const passport = require('passport')
const validateProfileData =  require('../../validation/profile')

//Loading Models 
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User = require('../../models/User')

// @route GET api/profile/feeds
// desc get all profile feeds
// @access private
router.get('/feed',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Post.find({user:req.user.id})
    .sort({date:-1})
    .then(posts=>{
        if(!posts || posts.length<1){
            return res.status(404).json({status:"No posts found for you"})
        }
        res.json(posts)
    })
    .catch(err=>res.status(404).json({status:"No posts found for you"}))
})

// @route GET api/profile/handle/:email
// desc Get handle profile
// @access public

router.get('/handle/:email',(req,res)=>{
    console.log(req.params.email)

    User.findOne({email:req.params.email})
    .then(user=>{
        if(user){
            
            //searching profile with user id's
            Profile.findOne({user:user.id})
            .populate('user',['email','name','avatar'])
            .then(profile=>{
            if(!profile){
                return res.status(404).json({profile:"Profile Unavailable"})
            }
            
            res.json(profile)
            })
            .catch(err=>res.status(404).json({profile:"No profile found for this id"}))
        }else{
            return res.status(404).json({profile:"No user found with this email"})
        }
    })
    .catch(err=>res.status(404).json({profile:"No profile found for this email"}))

  
})





// @route GET api/profile
// desc GEt current user profile
// @access private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            return res.status(404).json({noProfile:"No Profile found ! Please update new Profile"})
        }
        res.json(profile)
    })
})

// @route POST api/profile
// desc post user profile
// @access private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

        console.log("got req")
        const {error,isValid} = validateProfileData(req.body)
        
        console.log("Everything fine")
        const profileField = {}
        const errors = {}
        profileField.user = req.user.id
        if(req.body.handle) profileField.handle = req.body.handle
        if(req.body.company) profileField.company = req.body.company
        if(req.body.bio) profileField.bio = req.body.bio
        if(req.body.website) profileField.website = req.body.website
        if(req.body.status) profileField.status = req.body.status
        if(req.body.location) profileField.location = req.body.location
        if(req.body.githubusername) profileField.githubusername = req.body.githubusername
        //Skills of profile adding
        if(typeof req.body.skills !=='undefined'){
            profileField.skills = req.body.skills.split(',')
        }
        //Social Fields adding
        profileField.social = {}
        if(req.body.youtube) profileField.social.youtube = req.body.youtube
        if(req.body.instagram) profileField.social.instagram = req.body.instagram
        if(req.body.facebook) profileField.social.facebook = req.body.facebook
        if(req.body.linkedin) profileField.social.linkedin = req.body.linkedin
      
        Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(profile){
                //Update Profile
                console.log("profile found")
                Profile.findOneAndUpdate({user:req.user.id},{$set:profileField},{new:true})
                .then(profile=>res.json(profile))
            }else{
                //Creating new profile
                console.log("new profile"+profileField)
                    new Profile(profileField).save()
                    .then(profile=>{
                        console.log("Profile Saved")
                        res.json(profile)})
                .catch(err=>{console.log(err)})

            }
            
        })
})



module.exports = router