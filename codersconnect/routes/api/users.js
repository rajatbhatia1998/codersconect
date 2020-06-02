const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router();
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const {secret}  = require('../../config/keys')
const validateRegisterData = require('../../validation/register')
const validateLoginData = require('../../validation/login')


// @route GET api/users/all
// desc Show all Users
// @access private

router.get('/all',(req,res)=>{
    User.find()
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        console.log(err)
    })
})

// @route GET api/users/:user_id
// desc Get User details by user_id
// @access private
router.get('/:user_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.params.user_id})
   .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            return res.json({profile:`${profile.name} do not have any profile yet`})
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json({profile:"There is not profile for this user"}))
})

// @route GET api/users/register
// desc Register new user
// @access Public
router.post('/register',(req,res)=>{
    const {errors,isValid} = validateRegisterData(req.body)

    if(!isValid){
        return res.status(404).json(errors)
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(404).json({email:"Email already exists"})
        }else{
            const avatar = gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'
            })
            const newUser = new User({
                name:req.body.name,
                password:req.body.password,
                avatar,
                email:req.body.email

            })
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err
                    }
                    newUser.password = hash
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
        }
    })
    .catch(err=>res.status(404).json(err))
})

// @route POST api/users/login
// desc Login user
// @access Public
router.post('/login',(req,res)=>{
    const {errors,isValid} = validateLoginData(req.body)
    if(!isValid){
         res.status(404).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    

    User.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password)
            .then(isMatched=>{
                if(isMatched){

                    const payload = {id:user.id, name:user.name, avatar:user.avatar}

                    //Sign token
                    jwt.sign(payload,
                        secret,
                        {expiresIn:21600},
                        (err,token)=>{
                            res.json({success:true,
                            token:"Bearer "+token
                            })
                        }
                        )
                }else{
                    res.status(404).json({message:"Invalid Password"})
                }
            })
            .catch(err=>console.log(error))
        }else{
            res.status(404).json({message:"Email not found ! Please Sign Up"})
        }
    })
})

// @route GET api/users/current
// desc Return current user
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user)

})





module.exports = router