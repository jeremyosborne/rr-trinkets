import React from 'react'
import {REDUCER_KEY, DEFAULT_STATE} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case ENQUEUE:
      return state.concat(action.payload)
    case DEQUEUE:
      return state.slice(1)
    default:
      return state
  }
}
export default reducer

// Add a new notification to the end of the notification queue.
export const ENQUEUE = 'rrnotify/ENQUEUE'
// See docs for notify, which is our main public entry point.
export function enqueue (payload) {
  if (payload instanceof Error) {
    // Basic JavaScript errors roughly conform to our needs.
    payload = {
      message: payload.message,
      // explicit typing in our notifications, because someday we might have
      // error subtleties / error codes so don't assume that an error object
      // always means just isError.
      type: 'error',
    }
  } else if (typeof payload === 'string' || React.isValidElement(payload)) {
    // Assume it is a string or UI-ish component meant to be displayed as is.
    payload = {
      message: payload,
      // other fields on the notification object are extensible and dependent
      // on the UI handling the notification object.
    }
  }
  return {
    type: ENQUEUE,
    payload,
  }
}

/**
 * Add a notification to the queue of notifications.
 *
 * While the action is forgiving, the payload is a general notification object
 * and is assumed tp be shaped as:
 *
 * {
 *    message: {React.Node|String} passed through to the UI.,
 *    type: {['info'|'error']='info'} type of notification, assumed to affect styling of UI.
 * }
 *
 * However, due to how notifications can be dynamically created, we attempt to do
 * the right thing with errors, objects, Maps, and even React Nodes assuming attempting
 * to message a user is most important.
 *
 * @param {Object|String|Error} payload
 * @return {Object} Flux Standard Action
 */
export const notify = enqueue

// Pop a notification from the head of the queue.
export const DEQUEUE = 'rrnotify/DEQUEUE'
export function dequeue (payload) {
  return {type: DEQUEUE}
}
