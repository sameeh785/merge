import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({component : Component ,auth : { isAuthenticated , loading} , ...rest}) => (
   
  <Route {...rest} render = {(props) => {
    console.log('1212')
   return !isAuthenticated && !loading ? (<Redirect to="/login"/>) : (<Component {...props} />) } 
   } />
  
)

PrivateRoute.propTypes = { 
  auth :  PropTypes.object.isRequired,
}

export default connect((state) =>{
 return { auth : state.auth
      }
})(PrivateRoute)
