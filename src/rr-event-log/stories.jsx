//
// Usage documentation for working with rrNotify.
//

import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

import {rrEventLog, recordEvent} from './'

// Hook rrEventLog into your store.
// You'll want to make use of the REDUCER_KEY, which by default is `rrEventLog`,
// as the selectors depend on it.
const store = createStore(combineReducers({
  [rrEventLog.REDUCER_KEY]: rrEventLog.reducer
}))
// You'll probably `connect(...)` the notify method, but for sake of example, we
// explicitly dispatch some notifications to populate the queue: first in, first out.
store.dispatch(recordEvent("We've updated our privacy policy."))
store.dispatch(recordEvent({message: "Did you know, we've updated our privacy policy?"}))
// This will get implicit error styling.
store.dispatch(recordEvent(new Error('Uh oh, we updated our privacy policy')))

storiesOf('rr-event-log', module)
  .add('sample mock log of events', () => (
    <Provider store={store}>
      <ul>
        {rrEventLog.selectors(store.getState()).queue.map((event) => {
          return (
            <li>{new Date(event.timestamp).toISOString()}: `{event.type}`: {event.message}</li>
          )
        })}
      </ul>
    </Provider>
  ))
