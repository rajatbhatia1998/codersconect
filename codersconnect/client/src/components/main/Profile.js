import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactLoading from 'react-loading'
import {Button,Form,Row,Col} from 'react-bootstrap'


export const Profile = () => {
    const isLoading = useSelector(state=>state.loading.isLoad)
    const profile = useSelector(state=>state.profile.profile,()=>{ 
        



    })
    const user = useSelector(state=>state.auth.user)
    
    
    
    
    const dispatch = useDispatch()

    const [state,setState] = useState({
            name:"",
            company:"",
            bio:"",
            website:"",
            status:"",
            location:"",
            githubusername:"",
            skills:"",
    })
   
    useEffect(()=>{
        dispatch({type:"GET_CURRENT_PROFILE"})  
        setState({
            name:user.name,
            company:profile.company,
            bio:profile.bio,
            website:profile.website,
            status:profile.status,
            location:profile.location,
            githubusername:profile.githubusername,
            skills:profile.skills+""
        })    
       
    },[])

    const changeHandler=(e)=>{
        const {name , value} = e.target
        setState( prevState => ({
            ...prevState,
            [name] : value
        })
        )
  }
    return (
        <div id="profilePage">
            {console.log(profile,state)}
            {(isLoading && profile===undefined)?( 
                
                <ReactLoading type={"bubbles"} color={"black"} />):
                (
                        <div id="profileForm">
                        
                            <Form>
                            
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Name
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control style={{marginLeft:"15px"}} readOnly defaultValue={user.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Company
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control style={{marginLeft:"15px"}} value={state.company} name="company" onChange={changeHandler} type="text" />
                                </Col>
                            </Form.Group>
                            
                          <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Bio
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control style={{marginLeft:"15px"}} value={state.bio} name="bio"onChange={changeHandler} as="textarea" />
                            </Col>
                        </Form.Group>
                            

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Status
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control  style={{marginLeft:"15px"}}value={state.status} onChange={changeHandler} name="status" type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Location
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control style={{marginLeft:"15px"}} value={state.location} onChange={changeHandler} name="location" type="text" />
                    </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Website
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control style={{marginLeft:"15px"}} value={state.website} onChange={changeHandler} name="website" type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Skills 
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control style={{marginLeft:"15px"}} value={state.skills} onChange={changeHandler} name="skills" type="text" />
                        </Col>
                    </Form.Group>

                
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Github 
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control style={{marginLeft:"15px"}} value={state.githubusername} onChange={changeHandler} name="githubusername" type="text" />
                    </Col>
                </Form.Group>

                <Button onClick={
                    ()=>{
                        console.log(state)
                        dispatch({type:"NEW_CURRENT_PROFILE",payload:state})
                    }}>
                    Update</Button>

                    
                            </Form>
                            
                        
                        </div>
                

                )}
           

       
        </div>
    )
}
