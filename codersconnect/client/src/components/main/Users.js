import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {Fade} from 'react-reveal'
import {Card,Button} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
 class Users extends Component {
     constructor(props){
         super(props)
         this.state = {
             users:undefined,
             loading:false
         }
     }
     componentDidMount(){
       this.getUserList()
     }
     getUserList= async ()=>{
        const res = await axios.get('/api/users/all')
        this.setState({users:res.data,loading:true})
        
     }

    render() {
        return (
            <div id="users">
            {!this.state.loading?(
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                     <ReactLoading type={"bubbles"} color={"#0B96F7"} height={"200px"} width={"200px"}/>
                </div>
               
            ):
                <div>
                <h1>USERS</h1>
                {this.state.users.map(user=>{

                   
                    
                    return  <Fade right>
                            <Card style={{ width: '100%',padding:"10px" ,margin:"10px 0 10px 0"}}>
                            <Card.Body>
                            <Card.Title><img src={user.avatar} style={{width:"70px",height:"70px",borderRadius:"50%"}}/></Card.Title>
                            <Card.Text style={{fontWeight:"bold"}}>
                                {user.name}
                            </Card.Text>
                            <Card.Text>
                                {user.email}
                            </Card.Text>
                            <Link to="/view">                            <Button variant="primary"
                            onClick={
                                ()=>{
                                    this.props.searchUser({
                                        email:user.email
                                    })
                                }
                            }
                            
                            
                            >View Profile</Button></Link>

                            </Card.Body>
                            </Card>
                        </Fade>

                })}
                </div>
            }
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        loading:(payload)=>dispatch({type:"SET_LOADING",payload}),
        searchUser:(payload)=>dispatch({type:"SEARCH_USER",payload})
    }
}
const mapStateToProps = state =>{
    return{
        loading:state.loading.isLoad
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Users);
