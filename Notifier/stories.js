import {rrnotify, Notifier, notify} from '../'
import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

const store = createStore(combineReducers({[rrnotify.REDUCER_KEY]: rrnotify.reducer}))
store.dispatch(notify("We've updated our privacy policy."))
store.dispatch(notify({message: "Did you know, we've updated our privacy policy?"}))
store.dispatch(notify(new Error('Uh oh, we updated our privacy policy')))
store.dispatch(notify({message: 'You really should care about your privacy.', type: 'error'}))
store.dispatch(notify((
  <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noopener noreferrer'>Updated: Our Privacy Policy. Read now!</a>
)))

storiesOf('Notification & Notifier', module)
  .add('Notifier', () => (
    <Provider store={store}>
      <Notifier />
    </Provider>
  ))
