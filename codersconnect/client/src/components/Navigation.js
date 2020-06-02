import React, { Component } from 'react'
import {
    Navbar
    ,Nav,
    Form,
    FormControl,
    Button,
    NavDropdown
} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


 class Navigation extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:""
        }
    }

    componentDidMount(){
         
    }

    guestLinks=()=>(
        <Nav className="mr-auto">
                    
        <Nav.Link ><Link to='/signup' id="nav_link">Create Account</Link></Nav.Link>
        <Nav.Link ><Link to='/aboutus' id="nav_link">About Me</Link></Nav.Link>

        <NavDropdown title="Features" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Live Stream (Soon)</NavDropdown.Item>
             <NavDropdown.Item href="#">Social Connect</NavDropdown.Item>
            <NavDropdown.Item href="#">Daily Feeds</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Better Community</NavDropdown.Item>
        </NavDropdown>
    </Nav>
   
    );
    userLinks=()=>(
        <Nav className="mr-auto">
            <Nav.Link ><Link to='/feeds' id="nav_link">MY FEEDS</Link></Nav.Link>
            <Nav.Link ><Link to='/users' id="nav_link">USERS</Link></Nav.Link>
        </Nav>
   
    );
    render() {
       
        return (
            <div>
        
            {this.props.auth.isAuthenticated?<Redirect to='/wall'/>:<Redirect to='/login'/>}
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand ><Link to='/' id="nav_link">CODERS CONNECT</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                  
                      
                   {this.props.auth.isAuthenticated?(this.userLinks()
                    ):this.guestLinks()}

                   

                  

                    <Form inline style={{marginRight:"10px"}}>
                        <FormControl type="text" placeholder="Enter Email" className="mr-sm-2" onChange={
                            (e)=>{
                                this.setState({email:e.target.value})
                            }
                        } />

                        <Link to="/view">
                            <Button  variant="outline-primary"
                            onClick={()=>{
                                this.props.searchUser({
                                email:this.state.email
                            })
                            
                        }}
                            >Search</Button></Link>
                    </Form>

                    {this.props.auth.isAuthenticated?(
                        <NavDropdown style={{color:"white"}}title={this.props.auth.user.name} id="basic-nav-dropdown ">
                        <img src={this.props.auth.user.avatar} style={{width:"25px",height:"25px",borderRadius:"50%",margin:"0 2px 0 2px"}}></img>
                           <Link to='/profile' style={{color:"black",textDecoration:"none",marginLeft:"2px"}}>My Profile</Link>
                           <NavDropdown.Divider />
                           <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                       </NavDropdown>
                   ):null}
                   
                    
                    </Navbar.Collapse>
                </Navbar>
                
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        auth:state.auth
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        logout:()=>dispatch({type:"LOGOUT"}),
        searchUser:(payload)=>dispatch({type:"SEARCH_USER",payload})
    }
}

export default connect(mapStateToProps,mapDispatchToProps,)(Navigation)