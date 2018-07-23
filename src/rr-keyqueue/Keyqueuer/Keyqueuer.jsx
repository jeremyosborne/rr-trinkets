import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'

import {enqueue} from '../duck'

export class Keyqueuer extends React.Component {
  static propTypes = {
    onKeyDown: PropTypes.func.isRequired,
  }

  componentDidMount () {
    document.addEventListener('keydown', this.props.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.props.onKeyDown)
  }

  render () {
    return (
      <div style={{display: 'none'}} />
    )
  }
}

const mapDispatchToProps = {
  onKeyDown: enqueue,
}

export default compose(
  connect(null, mapDispatchToProps),
)(Keyqueuer)
