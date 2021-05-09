import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import Experience from './experience'
import Education from './education'
import {getCurrentProfile,deleteAccount} from '../../actions/profile'
import {DashboardAction} from './DashboardAction'
const Dashboard = ({getCurrentProfile,auth :{user} ,profile : {profile,loading},deleteAccount}) => {
  useEffect(() =>{
     getCurrentProfile();
  },[getCurrentProfile])
  return loading && profile === null ? (<Spinner/>) : (<Fragment><h1 className='large text-primary'>Dashboard</h1>
  <p className='lead'>
    <i className="fas fa-user"></i> Welcome {user && user.name}</p>
    {profile === null ? (<Fragment><p>You have not set up your profile , please add some info</p>
    <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
    </Fragment>) : (<Fragment>
      <DashboardAction/> 
    <Experience experience={profile.experience}/>
    <Education education={profile.education}/>
    <div className='my-2'>
      <button className='btn btn-danger' onClick={() =>{
        deleteAccount()
      }}>
        <i className="fas fa-user-minus">Delete My Account</i>

      </button>
    </div>
    </Fragment>)}</Fragment>)
}
Dashboard.propTypes = {
 getCurrentProfile : PropTypes.func.isRequired,
 auth : PropTypes.object.isRequired,
 profile : PropTypes.object.isRequired,
 deleteAccount : PropTypes.func.isRequired,
}

export default connect((state) =>{
  return {
    auth : state.auth,
    profile : state.profile
  }

},{getCurrentProfile,deleteAccount}) (Dashboard)
