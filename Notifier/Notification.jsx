import classNamesBinder from 'classnames/bind'
import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './Notification.css'

const cx = classNamesBinder.bind(styles)

export const Notification = (props) => {
  const {notification} = props
  return (
    <div className={cx('notification', get(notification, 'type', 'info'))}>
      <div className={styles.message}>{ get(notification, 'message') }</div>
      <button className={styles.close} onClick={props.onClose}>Close</button>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

export default Notification
