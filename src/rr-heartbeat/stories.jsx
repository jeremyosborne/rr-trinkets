//
// Usage documentation for working with rrNotify.
//

import React from 'react'
import {connect, Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

import {rrHeartbeat} from './'

// Hook rrNotify into your store.
// You'll want to make use of the REDUCER_KEY, which by default is `rrNotify`,
// as the selectors depend on it.
const store = createStore(
  combineReducers({
    [rrHeartbeat.REDUCER_KEY]: rrHeartbeat.reducer
  }),
  applyMiddleware(rrHeartbeat.createMiddleware())
)

const StartButton = connect(
  null, {
    start: rrHeartbeat.start,
  })(
  (props) => (
    <button onClick={props.start}>Start</button>
  ))

const StopButton = connect(
  null, {
    stop: rrHeartbeat.stop,
  })(
  (props) => (
    <button onClick={props.stop}>Stop</button>
  ))

const Info = connect(
  (state) => rrHeartbeat.selectors(state),
  null)(
  (props) => (
    <div>
      <p><b>Heartbeat running:</b> {'' + props.running}</p>
      <p><b># of heartbeats (total):</b> {'' + props.count}</p>
      <p><b># of heartbeats (current run):</b> {'' + props.countCurrent}</p>
      <p><b>drift in current run:</b> {'' + props.drift}</p>
    </div>
  ))

storiesOf('rrHeartbeat visualized', module)
  .add('rrHeartbeat', () => (
    <Provider store={store}>
      <React.Fragment>
        <div>
          <StartButton />
        </div>
        <div>
          <StopButton />
        </div>
        <Info />
      </React.Fragment>
    </Provider>
  ))
