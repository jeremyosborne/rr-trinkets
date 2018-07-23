/* eslint-disable react/prop-types */
//
// Usage documentation for working with rrKeyqueue.
//

import React from 'react'
import {connect, Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

import {rrKeyqueue, Keyqueuer} from './'

// Hook into your store.
// You'll want to make use of the REDUCER_KEY, which by default is `rrKeyqueue`,
// as the selectors depend on it.
const store = createStore(combineReducers({
  [rrKeyqueue.REDUCER_KEY]: rrKeyqueue.reducer
}))

let KeyFlusher = connect(
  null,
  {
    onClick: rrKeyqueue.dequeue,
  }
)((props) => (
  <button {...props}>Dequeue an event</button>
))

// Your components can be anything you want. Here we display the key events.
let KeysPressed = connect(
  (state) => ({
    count: rrKeyqueue.selectors(state).count,
    queue: rrKeyqueue.selectors(state).queue,
  })
)((props) => (
  props.count
    ? props.queue.map((event, i) => <span key={i}>Key Pressed: '{event.key}'{i < props.queue.length - 1 ? ', ' : ''}</span>)
    : <span>The keyqueue is empty.</span>
))

storiesOf('rr-keyqueue', module)
  .add('usage with Keyqueuer', () => (
    <Provider store={store}>
      <React.Fragment>
        <h1>Working with the keyqueue</h1>
        <p>Focus the window and start typing. Your keyboard presses will be captured and added to the queue.</p>
        <div style={{padding: '1em 0'}}>
          <KeyFlusher />
        </div>
        <KeysPressed />
        <Keyqueuer />
      </React.Fragment>
    </Provider>
  ))
