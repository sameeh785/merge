 import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function Alert({alerts}){
  return <>
    {alerts.length > 0  && alerts !== null ? alerts.map(item =>{
      return <div key={item.id} className={`alert alert-${item.alertType}`}>{item.msg}</div>
    }) : null}
    </>
}

Alert.propTypes = {

  alerts:PropTypes.array.isRequired,

}

export default connect((state) =>{
  return {
    alerts : state.alert
  }
})(Alert)

