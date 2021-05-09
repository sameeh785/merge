import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import { login} from '../../actions/auth'
import {connect} from 'react-redux'


 const Login = ({login,isAnthenticated }) => {
  let [formData, setData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData;
 const onChangeData = (e) => 
    setData({ ...formData, [e.target.name] : e.target.value })
 
  function submitData(e) {
    e.preventDefault();
    
    login(email,password)
    
    
  }
  //check the user is Anthenticated 
  if(isAnthenticated){
   return <Redirect to='/dashboard'/>
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>
      <form className="form" onSubmit={e => submitData(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" onChange={(e => onChangeData(e))} name="email" />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e => onChangeData(e))}
            required

          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  )
}
Login.prototype={
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
}
export default connect((state) =>{
  return {
    isAnthenticated : state.auth.isAuthenticated
  }
},{login})(Login)




