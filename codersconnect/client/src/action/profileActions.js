import {put,call,takeLatest} from 'redux-saga/effects'
import axios from 'axios'


function getProfileWithApi(){
    return axios.get('api/profile/')
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function searchProfileWithApi(payload){
    return axios.get(`api/profile/handle/${payload.email}`)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function setProfileWithApi(payload){
    console.log(payload)
    return axios.post('api/profile/',payload)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function* getCurrentProfile(){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(getProfileWithApi)
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        yield put({type:"SET_CURRENT_PROFILE",payload:res.data})
    }
    yield put({type:"SET_LOADING",payload:false})

}

function* setCurrentProfile(action){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(setProfileWithApi,action.payload)
    if(res.status===404){
        console.log(res.data)
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        console.log(res.data)
        yield put({type:"SET_CURRENT_PROFILE",payload:res.data})
    }
    yield put({type:"SET_LOADING",payload:false})
}
function* searchUser(action){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(searchProfileWithApi,action.payload)
    if(res.status===404){
        console.log(res.data)
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        console.log(res.data)
        yield put({type:"SET_SEARCH_PROFILE",payload:res.data})
    }
    yield put({type:"SET_LOADING",payload:false})
}
export function* profileSaga(){
    yield takeLatest('GET_CURRENT_PROFILE',getCurrentProfile)
    yield takeLatest('NEW_CURRENT_PROFILE',setCurrentProfile)
    yield takeLatest('SEARCH_USER',searchUser)
}