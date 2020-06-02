import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {errorReducer} from './errors'
import {profileReducer} from './profileReducer'
import {loadingReducer, laodingReducer} from './loading'
import {postReducer} from './postReducer'

export const rootReducer = combineReducers({
    auth:authReducer,
    loading:laodingReducer,
    errors:errorReducer,
    profile:profileReducer,
    post:postReducer
})