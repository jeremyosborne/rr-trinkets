import Notification from './Notification.jsx'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'

import {selectors, remove} from '../duck'

export class Notifier extends React.Component {
  static propTypes = {
    notification: PropTypes.shape({
      /** Visual portion of notification. */
      message: PropTypes.node.isRequired,
      /** Info is default. */
      type: PropTypes.oneOf(['error', 'info']),
    }),
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    notification: null,
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
  return {
    notification: notifications.head,
  }
}

const mapDispatchToProps = {
  onClose: remove,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Notifier)
