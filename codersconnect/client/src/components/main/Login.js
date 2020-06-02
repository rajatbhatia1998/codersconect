import React,{useState} from 'react'
import {Form,Button,Modal,Jumbotron} from 'react-bootstrap'
import  {useDispatch,useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Fade} from 'react-reveal'


 function Login(props) {
     const [email, setEmail] = useState("")
     const [password,setPassword] = useState("")
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)
 



    const loginHandler = (e)=>{
      e.preventDefault();
      const user = {
        email,
        password
      }
      dispatch({type:"LOGIN_REQUEST",payload:user})

    }

    return (
        <div className="loginPage">
    
        {auth.isAuthenticated?( props.history.push('/wall')):null}
        
        <Fade left>
        <Jumbotron style={{backgroundColor:"#e5e5e5"}}>
            <h1>Welcome Coders</h1>
            <p>
              We Provide you a platform to share your knowledge, 
              skills ,tips & tricks with other developers by your feeds
              and make this world a better place.
            </p>
            <p>
                    <Button variant="primary" onClick={handleShow}>
                    LOGIN
                  </Button>
            </p>
        </Jumbotron>
        </Fade>

        <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        
        <div>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
    
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
    </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={loginHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}


export default withRouter(Login)
