
import {REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,Account_Deleted}
 from '../actions/types'

const intialization  ={
  token : localStorage.getItem('token'),
  isAuthenticated : null,
  loading : true,
  user : null
}
export default function (state = intialization, action) {
  const {type , payload} = action;
  switch(type){
    case USER_LOADED :
      return {...state,isAuthenticated : true , loading : false , user : payload}
    case REGISTER_SUCCESS :
    case LOGIN_SUCCESS :
    
      localStorage.setItem('token1',payload.token)
      return { ...state,...payload,isAuthenticated : true , loading : false};
    case REGISTER_FAIL :
    case AUTH_ERROR :
    case LOGIN_FAIL:
    case LOGOUT :
    case Account_Deleted:
      localStorage.removeItem('token1')
      return {...state,token : null, isAuthenticated : null,
        loading : false};
    default :
    return state;

  }
}