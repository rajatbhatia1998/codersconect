import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {Card,Button} from 'react-bootstrap'
import {Fade} from 'react-reveal'

 class UserView extends Component {
    render() {
        const user = this.props.profile.user
        const profile = this.props.profile
        return (
            <div id="user-view">

            {this.props.loading?
                (
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                     <ReactLoading type={"bubbles"} color={"#0B96F7"} height={"200px"} width={"200px"}/>
                </div>
               
            ):
            <Fade>
                        <Card id="userViewCard">
                            <Card.Title><img src={user.avatar} style={{width:"70px",height:"70px",borderRadius:"50%"}}/></Card.Title>
                            <Card.Body>


                               <h4>{user.name} ({profile.status})</h4>

                               <p><span id="user-bold">Bio: </span>{profile.bio}</p>
                            
                               <p><span id="user-bold">Current Company: </span>{profile.company}</p>

                               <p><span id="user-bold">Location: </span>{profile.location}</p>
                            

                               <p><span id="user-bold">Webiste: </span>
                               {profile.website?profile.website:<span>Not available</span>}
                               </p>

                               <p><span id="user-bold">Github: </span>
                               {profile.github?profile.github:<span>Not available</span>}
                              </p>

                               <div id="skills-conatiner">
                               <h4 id="user-bold">Skills</h4> 
                                  <ul id="skills">
                                    <li id="skills-item">JAVA</li>
                                    <li id="skills-item">Python</li>
                                    <li id="skills-item">JS</li>
                                
                                </ul>
                               
                               </div>

                            </Card.Body>
                        </Card>
                   
            </Fade>
        }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{

    }
}
const mapStateToProps = state =>{
    return{
        loading:state.loading.isLoad,
        profile:state.profile.searchProfile,
        user:state.profile.searchProfile.user,
        error:state.errors
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserView)


