import React, { Fragment, useState } from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'

import PropTypes from 'prop-types'


const Register = ({setAlert,register, isAnthenticated}) => {
  let [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData;
 const onChangeData = (e) => 
    setData({ ...formData, [e.target.name] : e.target.value })
 
  function submitData(e) {
    e.preventDefault();
    if(password !== password2){
      setAlert('password does not match','danger',3000)
    }
    else{
      console.log(formData)
      register({name,email,password})
    }
    
  }
    //check the user is Anthenticated 
    if(isAnthenticated){
      return <Redirect to='/dashboard'/>
     }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => submitData(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e => onChangeData(e))}   />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" onChange={(e => onChangeData(e))}  name="email" />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength = '6'
            value={password}
            onChange={(e => onChangeData(e))}
            required

          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
           minLength='6'
            value={password2}
            onChange={(e => onChangeData(e))} 
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}
Register.prototype={
  setAlert : PropTypes.func.isRequired,
  register : PropTypes.func.isRequired,
  isAnthenticated : PropTypes.bool,

}
export default connect((state) =>{
  return {
    isAnthenticated : state.auth.isAuthenticated
  }
},{setAlert,register})(Register)