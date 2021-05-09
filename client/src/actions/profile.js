import axios from 'axios';
import { setAlert } from './alert'
import { Clear_profile, Get_PROFILE, Profile_Error, Update_Profile ,Account_Deleted,Get_PROFILES,Get_Repos} from './types'


//get current user profile

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: Get_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

//get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({type : Clear_profile})
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: Get_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

//get profile by id
export const getProfileById = (userID) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    dispatch({
      type: Get_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}



//get Github repos
export const getGithubRepos = (userName) => async dispatch => {
  try {
    console.log('assssssssssssssssssssssssssssssssssssssssssss')
    const res = await axios.get(`/api/profile/github/${userName}`);
    console.log(res ,'sami')
    dispatch({
      type: Get_Repos,
      payload: res.data
    })
  } catch (error) {
    console.log("userName")

    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// creare or update user profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": 'application/json'
      }
    }
    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: Get_PROFILE,
      payload: res.data
    })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'),'danger')
    if (edit === false) {
      history.push('/dashboard')
    }
  } catch (error) {
    const errors = error.response.data;
    console.log(errors)
    if (errors.errors) {
      errors.errors.forEach(error => {
        dispatch(setAlert(error.msg,'danger'))
      });
    }
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}


// Add experience to profile

export const addExperience = (formData , history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": 'application/json'
      }
    }
    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch({
      type: Get_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experinece Edit','success'))
      history.push('/dashboard');
    
  } 
  catch (error) {
    const errors = error.response.data;
    console.log(errors)
    if (errors.errors) {
      errors.errors.forEach(error => {
        dispatch(setAlert(error.msg,'danger'))
      });
    }
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  } 

}



// Add education to profile

export const addEducation = (formData , history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": 'application/json'
      }
    }
    const res = await axios.put('/api/profile/education', formData, config)
    dispatch({
      type: Get_PROFILE,
      payload: res.data
    })
    dispatch(setAlert("Education Edit","danger"))
      history.push('/dashboard')
    
   }
   catch (error) {
    const errors = error.response.data;
    console.log(errors)
    if (errors.errors) {
      errors.errors.forEach(error => {
        dispatch(setAlert(error.msg,'danger'))
      });
    }
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  } 

}

//delete experience

export const deleteExperience = (id) => async dispatch =>{
  try{
    console.log('deleteeeeeeeee')
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type : Update_Profile,
      payload : res.data
    })
    dispatch(setAlert('Experience has been deleted','success'))
  }
  catch(error){
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

  }
}



//delete education

export const deleteEducation = (id) => async dispatch =>{
  try{
    const res = await axios.delete('/api/profile/education/'+id);
    dispatch({
      type : Update_Profile,
      payload : res.data
    })
    dispatch(setAlert('Education has been deleted','success'))
  }
  catch(error){
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

  }
}


//delete profile and user

export const deleteAccount = () => async dispatch =>{
 if(window.confirm('Are you sure to want to delete the account?')){
  try{
     await axios.delete('/api/profile/');
    dispatch({
      type : Clear_profile
    })
    dispatch({
      type : Account_Deleted
    })
    dispatch(setAlert('Your Account has been deleted','success'))
  }
  catch(error){
    dispatch({
      type: Profile_Error,
      payload: { msg: error.response.statusText, status: error.response.status }
    })

  }
 }
}