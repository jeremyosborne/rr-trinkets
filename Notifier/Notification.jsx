import React from 'react'
import PropTypes from 'prop-types'

import './Notification.css'

export const Notification = (props) => {
  return (
    <div className='rrnotify-notification'>
      <div className='rrnotify-notification-message'>{props.notification}</div>
      <button className='rrnotify-notification-close' onClick={props.onClose}>Close</button>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default Notification
