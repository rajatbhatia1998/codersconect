import React from 'react';
import axios from 'axios'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import  {useSelector,useDispatch} from 'react-redux'
import jwt_decode from 'jwt-decode'
import './App.css';
import ErrorToast from './components/errorToast'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Login from './components/main/Login'
import Posts from './components/main/Posts'
import About from './components/main/About'
import SignUp from './components/main/SignUp'
import Notfound from './components/main/Notfound'
import {Profile} from './components/main/Profile'
import Feeds from './components/main/Feeds'
import Users from './components/main/Users'
import UserView from './components/main/UserView'

function App() {
  //const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const errors = useSelector(state=>state.errors)
  const dispatch = useDispatch()
  const token = localStorage.getItem('jwtToken')
  if(token){
    const user = jwt_decode(token)
    dispatch({type:"SET_CURRENT_USER",payload:user})
    axios.defaults.headers.common['Authorization'] = token;
  }
  else{
    dispatch({type:"LOGOUT_USER"})
    axios.defaults.headers.common['Authorization'] = null;
  }
  return (
    <div className="App">
    <Router>

        <Navigation/>
     
        <Switch>

            <Route path="/" exact={true}>
              <Login />
            </Route>

            <Route path="/login" exact>
              <Login />
            </Route>

            <Route path="/wall" >
              <Posts/>
            </Route>

            <Route path="/view" >
              <UserView/>
            </Route>

            <Route path="/signup">
              <SignUp/>
            </Route>

            <Route path="/aboutus">
              <About/>
            </Route>

            <Route path="/profile">
              <Profile/>
            </Route>

            <Route path="/feeds">
              <Feeds />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="*">
              <Notfound/>
            </Route>

      </Switch>

     </Router>
     {Object.keys(errors).length?(<ErrorToast errors={errors}/>):null}
     <Footer/>

    </div>
  );
}

export default App;
