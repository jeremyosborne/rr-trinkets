import Notification from './Notification.jsx'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'

import {selectors, dequeue} from '../duck'

export class Notifier extends React.Component {
  static propTypes = {
    notification: PropTypes.node,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    notification: '',
    onClose: () => {},
  }

  render () {
    const {notification, onClose} = this.props
    return (
      notification
        ? <Notification notification={notification} onClose={onClose} />
        : null
    )
  }
}

const mapStateToProps = (state) => {
  const notifications = selectors(state)
  console.log(notifications)
  return {
    notification: notifications.head,
  }
}

const mapDispatchToProps = {
  onClose: dequeue,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Notifier)
