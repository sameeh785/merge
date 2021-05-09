import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, Clear_profile } from './types'
import { setAlert } from './alert'
import { setAuthToken } from '../utiliz/setAuthToken'

//load USER
export const LoadUSer = () => async (dispatch) => {
  if (localStorage.token1) {
    setAuthToken(localStorage.token1)
  }
  try {

    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

  }
  catch (e) {
    dispatch({
      type: AUTH_ERROR
    })

  }
}

//REGISTER A USER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password })
  try {

    const res = await axios.post('/api/users', body, config);
    console.log(res.data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(LoadUSer())

  } catch (err) {
    console.log(err)
    const errors = err.response.data;
    if (errors.error) {
      errors.error.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//LOGIN A USER
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })
  try {

    const res = await axios.post('/api/auth/', body, config);
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(LoadUSer())


  } catch (err) {
    console.log(err)
    const errors = err.response.data;
    if (errors.error) {
      errors.error.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'))
      });
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//User logout /clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  })
  dispatch({ type: Clear_profile })

}