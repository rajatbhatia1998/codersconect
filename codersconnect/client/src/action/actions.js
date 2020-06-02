import {put,call,takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const loginApiCall=(payload)=>{
    return axios.post('api/users/login',payload)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
    
}
const registerApiCall=(user)=>{
    return axios.post('api/users/register',user.payload)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
    
}

function* loginRequest(action){
    const res = yield call(loginApiCall,action.payload)
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        localStorage.setItem('jwtToken',res.data.token)
        var user = jwt_decode(res.data.token)
        yield put({type:"SET_CURRENT_USER",payload:user})
    }
}

function* logoutRequest(){
    localStorage.removeItem('jwtToken')
    yield put({type:"LOGOUT_USER"})
}

function* registerUser(action){
    const res = yield call(registerApiCall,action.payload)
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        const a = {
            type:"LOGIN_REQUESt",
            payload:{
                email:res.data.email,
                password:action.payload.payload.password
            }
        }
        yield call(loginRequest,a)
    }
}


export function* watchSaga(){
    yield takeLatest("LOGIN_REQUEST",loginRequest)
    yield takeLatest('LOGOUT',logoutRequest)
    yield takeLatest('REGISTER_USER',registerUser)
}



