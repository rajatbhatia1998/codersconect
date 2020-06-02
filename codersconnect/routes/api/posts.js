const express = require('express')
const router = express.Router();
const passport = require('passport')
const Post = require('../../models/Post')



// @route GET api/posts
// desc get all posts
// @access private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then(posts=>{
        if(!posts){
            return res.status(404).json({posts:"No Posts Found"})
        }
        res.json(posts)
    })
    .catch(err=>res.status(404).json({posts:"No Posts Found"}))
})

// @route GET api/posts/:id
// desc get post by id
// @access Public

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(!post){
            return res.status(404).json({posts:"No Post Found with this ID"})
        }
        res.json(post)
    })
})

// @route POST api/posts
// desc POST a post
// @access private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    new Post({
        user:req.user.id,
        text:req.body.text,
        name:req.user.name,
        avatar:req.user.avatar
    }).save().then(post=>{
        if(!post){
            return res.status(404).json({post:"Post not posted"})
        }
        res.json(post)
    })
    
   
})

// @route DELETE api/posts/:id
// desc delete post by id
// @access private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.param.id)
    Post.findById(req.params.id)
    .then(post=>{
        if(post.user.toString()===req.user.id){
            Post.deleteOne({_id:post.id})
            .then(post=>res.json({post:`${post.deletedCount} post sucessfully deleted`}))
            .catch(err=>res.status(404).json({post:"Post not deleted"}))
        }
    })
    .catch(err=>res.status(401).json({post:" Post not found"}))
})


// @route POST api/posts/like/:id
// desc  like the post by id
// @access private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   
    Post.findOne({_id:req.params.id})
    .then(post=>{
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0){
            return res.status(404).json({status:"POST ALREADY LIKED"})
          }
         if(post.dislikes.filter(like=>like.user.toString()===req.user.id).length > 0){
             //removing dislike
            Post.update({_id:req.params.id},{$pull :{dislikes: {user:req.user.id}}})
            .then(result=>res.json({status:"Post liked success"}))
            .catch(err=>res.status(404).json(err))
         }
 
        //adding like by removing dislike
         post.likes.unshift({user:req.user.id})
             post.save().then(post=>{
                 res.json(post)
             }).catch(err=>res.json({status:"Post not disiked"}))
    })
    .catch(err=>res.json({post:"Post not found"}))
})


// @route POST api/posts/dislike/:id
// desc  dislike the post by id
// @access private
router.post('/dislike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findOne({_id:req.params.id})
    .then(post=>{

        if(post.dislikes.filter(like=>like.user.toString()===req.user.id).length > 0){
          return res.status(404).json({status:"POST ALREADY DISKED"})
         }
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0){
           //Removing Like
            Post.update({_id:req.params.id},{$pull :{likes: {user:req.user.id}}})
            .then(result=>res.json({status:"Post diliked success"}))
            .catch(err=>res.status(404).json(err))
        }

        //adding dislike by removing like
        post.dislikes.unshift({user:req.user.id})
            post.save().then(post=>{
                return res.json(post)
            }).catch(err=>res.status(404).json({status:"Post not disiked"}))
       
    })
    .catch(err=>res.json(err))
})

// @route POST api/posts/comment/:id
// desc  comment the post by id
// @access private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>{
        
        //Adding Comment to post
        post.comments.unshift({
            user:req.user.id,
            name:req.user.name,
            avatar:req.user.avatar,
            text:req.body.text,
         })
        post.save().then(post=>{
            res.json(post)
            console.log("Comment Added")
        }).catch(err=>res.status(404).json(err))
   
    })
    .catch(err=>res.status(404).json(err))
})


// @route DELETE api/posts/comment/:id
// desc  delete comment by comment_id
// @access private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        
        //Removing Comment from post
        
        Post.findById(req.params.id)
        .then(post=>{
                //Removing Comment
                 Post.updateOne({_id:req.params.id} , {$pull :{comments: {_id:req.params.comment_id,user:req.user.id}}})
                 .then(result=>res.json({status:"Comment deleted done"}))
                 .catch(err=>res.status(404).json({status:"Comment cannot be deleted"}))
             
        })
        .catch(err=>res.status(401).json({post:" Post not found"}))
   
})

// @route POST api/posts/status/:id
// desc  dislike the post by id
// @access private
router.get('/status/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findOne({_id:req.params.id})
    .then(post=>{
        if(post.dislikes.filter(like=>like.user.toString()===req.user.id).length > 0){
            return res.json({status:"DISLIKED"})
        }else if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0){
            return res.json({status:"LIKED"})
          }
        else{
            return res.json({status:"NA"})
        }
    })
})


module.exports = router