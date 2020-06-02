import  {createStore,applyMiddleware} from 'redux'
import {rootReducer} from '../reducer/reducer'
import createSagaMiddleware  from 'redux-saga'
import {fork,all} from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension';
import {watchSaga} from '../action/actions'
import {profileSaga} from '../action/profileActions'
import {postSaga} from '../action/postActions'

const saga = createSagaMiddleware()
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(saga)))

export function* rootSaga(){
    yield all([
        fork(watchSaga),
        fork(profileSaga),
        fork(postSaga)
    ])
}
saga.run(rootSaga)

export default store