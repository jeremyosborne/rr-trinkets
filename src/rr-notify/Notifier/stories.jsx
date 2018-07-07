//
// Usage documentation for working with rrNotify.
//

import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

import {rrNotify, Notifier, notify} from '../'

// Hook rrNotify into your store.
// You'll want to make use of the REDUCER_KEY, which by default is `rrNotify`,
// as the selectors depend on it.
const store = createStore(combineReducers({
  [rrNotify.REDUCER_KEY]: rrNotify.reducer
}))
// You'll probably `connect(...)` the notify method, but for sake of example, we
// explicitly dispatch some notifications to populate the queue: first in, first out.
store.dispatch(notify("We've updated our privacy policy."))
store.dispatch(notify({message: "Did you know, we've updated our privacy policy?"}))
// This will get implicit error styling.
store.dispatch(notify(new Error('Uh oh, we updated our privacy policy')))
// This will get explicit error styling.
store.dispatch(notify({message: 'You really should care about your privacy.', type: 'error'}))
// Can display any React.Node as a notification.
store.dispatch(notify((
  <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noopener noreferrer'>Updated: Our Privacy Policy. Read now!</a>
)))

storiesOf('Notification & Notifier', module)
  .add('Notifier', () => (
    <Provider store={store}>
      {/*
        The default notifier is meant to be a placed in the root of your app,
        acts as a singleton, and shows the first notification until it is
        clicked on by the user to "close" the notification.
      */}
      <Notifier />
    </Provider>
  ))
