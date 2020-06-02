import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactLoading from 'react-loading'
import Post from './SinglePost'
import {Fade} from 'react-reveal'
export default function Posts() {
    const auth = useSelector(state=>state.auth)
    const loading = useSelector(state=>state.loading.isLoad)
    const posts = useSelector(state=>state.post.posts)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type:"FETCH_POSTS"})
    },[])
   
    return (
        <div id="wall">
            {(loading && posts)?(
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                     <ReactLoading type={"bubbles"} color={"#0B96F7"} height={"200px"} width={"200px"}/>
                </div>
               
            ):
                <div>
                <h1>THE WALL</h1>
                
                {(Array.isArray(posts) &&  (typeof posts !== 'string' || !posts instanceof String))?posts.map((post,index)=>{
                    return <Fade>
                                <Post post={post} key={index}/>
                            </Fade>
                }):
            
                <h3>No Posts Available</h3>
            }

                </div>
            }
            
        </div>
    )
}
