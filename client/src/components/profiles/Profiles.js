import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'


const Profiles = ({getProfiles,profile : {profiles,loading}}) => {
   
  useEffect(() =>{

    getProfiles()
  },[getProfiles])
  return (
    <Fragment>
      { loading ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className='lead'> 
        <i className="fab fa-connectdevelop"></i> Browse and connect to the Developers </p>
        <div className="profiles">
          {profiles.length > 0 ? ( profiles.map((item,index) =>{
          return <ProfileItem  key={item._id} profile={item}/>
          })): <h4> No profiles found</h4>}
        </div>
      </Fragment>}
    </Fragment>
  )
}

Profiles.propTypes = {
profile : PropTypes.object.isRequired,
}

export default connect((state) =>{
  return {
    profile : state.profile
  }
},{getProfiles})(Profiles)
