import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactLoading from 'react-loading'
import Post from './SinglePost'
import {Fade} from 'react-reveal'
import {Form,Button} from 'react-bootstrap'

export default function Feeds() {
    const auth = useSelector(state=>state.auth)
    const loading = useSelector(state=>state.loading.isLoad)
    const posts = useSelector(state=>state.post.feeds)
    const dispatch = useDispatch()
    const [text,setText] = useState("")

    useEffect(()=>{
        dispatch({type:"FETCH_FEEDS"})
    },[])
   
    return (
        <div id="wall">
            {(loading && posts)?(
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                     <ReactLoading type={"bubbles"} color={"#0B96F7"} height={"200px"} width={"200px"}/>
                </div>
               
            ):
                <div>
                <h1>MY FEEDS</h1>
                <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows="3" placeHolder="Add New Post"
                onChange={(e)=>{
                  setText(e.target.value)
                }}
                /> </Form.Group>

                <Button variant="outline-secondary"
                style={{marginBottom:"5px"}}
                onClick={()=>{
                    if(text!==""){
                        dispatch({
                            type:"ADD_POST",
                            payload:{
                                text:text
                            }})
                    }else{
                        alert("Please enter the value")
                    }
                   
                
            }}
                >ADD POST</Button><br/>
                </Form>
                {(Array.isArray(posts) &&  (typeof posts !== 'string' || !posts instanceof String))?posts.map((post,index)=>{
                    return <Fade>
                                <Post post={post} key={index} delete={true}/>
                            </Fade>
                }):
            
                <h3>No Posts Available</h3>
            }

                </div>
            }
            
        </div>
    )
}
