import * as rrnotify from '../duck'
import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Notification from './Notification.jsx'
import Notifier from './Notifier.jsx'

const store = createStore(combineReducers({[rrnotify.REDUCER_KEY]: rrnotify.reducer}))
store.dispatch(rrnotify.notify('An error of type 1 has occurred.'))
store.dispatch(rrnotify.notify('An error of type 2 has occurred.'))
store.dispatch(rrnotify.notify('An error of type 3 has occurred.'))

storiesOf('Notification & Notifier', module)
  .add('Notification', () => (
    <Notification notification='You have an error of type 2509.' onClose={action('clicked')} />
  ))
  .add('Notifier', () => (
    <Provider store={store}>
      <Notifier />
    </Provider>
  ))
