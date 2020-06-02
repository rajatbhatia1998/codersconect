import {put,call,takeLatest,all} from 'redux-saga/effects'
import axios from 'axios'


//APi's Calls

function getPostsWithApi(){
    return axios.get('api/posts/')
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function addCommentWithApi(payload){
    return axios.post(`api/posts/comment/${payload.id}`,payload)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function addLikeWithApi(payload){
    return axios.post(`api/posts/like/${payload.id}`)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function addDisikeWithApi(payload){
    return axios.post(`api/posts/dislike/${payload.id}`)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function fetchFeedsWithApi(){
    return axios.get('api/profile/feed')
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    })
}
function addPostWithApi(payload){
    return axios.post(`api/posts`,payload)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    }) 
}
function deletePostWithApi(payload){
    console.log(payload)
    return axios.delete(`api/posts/${payload.id}`)
    .then(res=>{
        return res  
    })
    .catch(err=>{
       return err.response
    }) 
}


//Generator calls
function* getAllPost(){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(getPostsWithApi)
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        yield put({type:"SET_POSTS",payload:res.data})
        // if (typeof res.data !== 'string' || !res.data instanceof String || res.data.length===0){
        //     yield put({type:"SET_POSTS",payload:res.data})
        // }else{
        //     window.location.reload()
        // }
    }
    yield put({type:"SET_LOADING",payload:false})
}

function* addComment(action){
    const res = yield call(addCommentWithApi,action.payload)
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        yield all([
            call(getAllPost),
            call(fetchFeeds)
        ])
       
       }
 
}

function* likePost(action){
    var res;    
    yield put({type:"SET_LOADING",payload:true})
    if(action.payload.do==="DISLIKE"){
        res = yield call(addDisikeWithApi,action.payload)
        yield all([
            call(getAllPost),
        ])
    }else{
     res = yield call(addLikeWithApi,action.payload)
     yield all([
        call(getAllPost),
       
    ])
    }
    yield put({type:"SET_LOADING",payload:false})
}

function* fetchFeeds(){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(fetchFeedsWithApi)
    
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        yield put({type:"SET_FEEDS",payload:res.data})
       }
    yield put({type:"SET_LOADING",payload:false})
}
function* addPost(action){
    yield put({type:"SET_LOADING",payload:true})
    const res = yield call(addPostWithApi,action.payload)
    
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        const res = yield call(fetchFeedsWithApi)
        if(res.status===404){
            yield put({type:"ERRORS_FOUND",payload:res.data})
        }else{
            yield put({type:"SET_FEEDS",payload:res.data})
       }
    }
         yield put({type:"SET_LOADING",payload:false})
}
function* deletePost(action){
    const res = yield call(deletePostWithApi,action.payload)
    
    if(res.status===404){
        yield put({type:"ERRORS_FOUND",payload:res.data})
    }else{
        const res = yield call(fetchFeedsWithApi)
        if(res.status===404){
            yield put({type:"ERRORS_FOUND",payload:res.data})
        }else{
            yield put({type:"SET_FEEDS",payload:res.data})
       }
    }
}
export function* postSaga(){
    yield takeLatest('FETCH_POSTS',getAllPost)
    yield takeLatest('ADD_COMMENT',addComment)
    yield takeLatest('LIKE_BUTTON_PRESS',likePost)
    yield takeLatest('FETCH_FEEDS',fetchFeeds)
    yield takeLatest('ADD_POST',addPost)
    yield takeLatest('DELETE_POST',deletePost)
}       