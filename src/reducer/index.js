import {combineReducers} from 'redux';
 import authReducer from './authReducer';
import {authErrorReducer} from './errorReducer';
import profileReducer from './ProfileReducer';
import {  postReducer } from './PostReducer';




export default combineReducers({
    auth:authReducer,
    errors:authErrorReducer,
    profile:profileReducer,
    post:postReducer
  
})