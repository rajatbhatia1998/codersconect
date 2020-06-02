import React, { Component } from 'react'
import {Card,Button,Form} from 'react-bootstrap'
import Comments from './Comments'
import {connect} from 'react-redux'
import axios from 'axios'


 class SinglePost extends Component {
     constructor(){
         super()
          this.state = {
            isLiked:"",
            text:"",
            likes:0,
            dislikes:0,
            status:""
          }
     }


    dispatchDislike = () =>{
      this.props.likeButton({
        id:this.props.post._id,
        isLiked:this.state.isLiked,
        do:"DISLIKE"
      })
      this.setState({likes:this.state.likes - 1,dislikes:this.state.dislikes+1})
    }
    dispatchLike = ()=>{
      this.props.likeButton({
        id:this.props.post._id,
        isLiked:this.state.isLiked,
        do:"LIKE"
      })
        this.setState({likes:this.state.likes + 1,dislikes:this.state.dislikes-1})
   }
     componentDidMount(){
        axios.get(`api/posts/status/${this.props.post._id}`)
        .then(res =>{
          this.setState({status:res.data.status})
          if(res.data.status==="LIKED"){
            this.setState({isLiked:true})
          }else if(res.data.status==="DISLIKED"){
            this.setState({isLiked:false})
          }else{
            this.setState({isLiked:"first"})
          }
        
        })
        
        this.setState({likes:this.props.post.likes.length})
        this.setState({dislikes:this.props.post.dislikes.length})
        
     }
    render() {
        return (
            <Card style={{ width: '98%' ,marginBottom:"10px",textAlign:"start"}}>
            <Card.Body>
              <Card.Title>{this.props.post.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"><h6> Date: {this.props.post.date.slice(0,10)} at {this.props.post.date.slice(12,16)}</h6></Card.Subtitle>
              <Card.Text>
              <hr/>
                {this.props.post.text}
                
              </Card.Text>
            
              {this.state.isLiked==="first"?
              <div>
              <i class="fa fa-thumbs-up thumb" aria-hidden="true" onClick={this.dispatchLike}></i> <i class="fa fa-thumbs-down thumb" aria-hidden="true" onClick={this.dispatchDislike}></i>
              </div>
              :
              <div>
              <i class={this.state.status==="LIKED"?"fa fa-thumbs-up thumb-green":"fa fa-thumbs-up thumb"} aria-hidden="true" onClick={this.dispatchLike}></i> <i class={this.state.status==="DISLIKED"?"fa fa-thumbs-down thumb-red":"fa fa-thumbs-down thumb"} aria-hidden="true" onClick={this.dispatchDislike}></i>
              </div>
              
            }
            
              <span style={{marginRight:"25px"}}>{this.state.likes} </span> {this.state.dislikes}
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows="3" id={this.props.key} placeHolder="Add Comment"
                onChange={(e)=>{
                  this.setState({
                    text:e.target.value
                  })
                }}
                />
                </Form.Group>
                <Button variant="outline-info" 
                onClick={()=>{
                  if(this.state.text!==""){
                    this.props.addComment({
                      text:this.state.text,
                      id:this.props.post._id
                    })
                  }else{
                    alert("Please type a comment!")
                 }
              }}>ADD</Button>

                {this.props.delete?(
                  <Button variant="danger" 
                onClick={()=>this.props.deletePost({
                  id:this.props.post._id
                })}
                style={{marginLeft:"5px"}}
                >DELETE POST</Button>
                ):(null)}
                
                <br/>
                
              
                
            </Form><br/>
           <Comments data={this.props.post.comments}/>
            
               
            </Card.Body>
          </Card>
        )
    }
}


const mapDispatchToProps = (dispatch) =>{
  return{
      addComment:(text)=>dispatch({type:"ADD_COMMENT",payload:text}),
      likeButton:(respond)=>dispatch({type:"LIKE_BUTTON_PRESS",payload:respond}),
      deletePost:(payload)=>dispatch({type:"DELETE_POST",payload})
  }
}


export default connect(null,mapDispatchToProps)(SinglePost)
