import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {connect} from 'react-redux'

 class SignUp extends React.Component {

    constructor(){
        super()
        this.state = {
            email:"",
            name:"",
            password:"",
            password2:""
        }
        this.registerHandle = this.registerHandle.bind(this)
    }

     registerHandle = ()=>{
         if(!(this.state.password===this.state.password2)){
             alert("Password is not same")
         }else{
             var user = {
                 email:this.state.email,
                 name:this.state.name,
                 password:this.state.password
             }
            this.props.register({type:"REGISTER_USER",payload:user})
         }
    }

    render(){
        return (
        
            <div id="registerForm">

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter your name" onChange={(e)=>this.setState({name:e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=>this.setState({email:e.target.value})}/>
            </Form.Group>
        
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" onChange={(e)=> this.setState({password:e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control name="password2" type="password" placeholder="Repeat Password" onChange={(e)=>this.setState({password2:e.target.value})}/>
            </Form.Group>


            <Button variant="primary" type="submit" onClick={this.registerHandle}>
                Submit
            </Button>
        
            </div>
        )
    }
   
}

const mapDispatchToProps = dispatch =>{
    return{
        register:(user)=>dispatch({type:"REGISTER_USER",payload:user})
    }
}


export default connect(null,mapDispatchToProps)(SignUp)
