import {REDUCER_KEY, DEFAULT_STATE} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

// Action types
//
// Add a new notification to the end of the notification queue.
export const ENQUEUE = 'rrnotify/ENQUEUE'
// Pop a notification from the head of the queue.
export const DEQUEUE = 'rrnotify/DEQUEUE'

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

export function enqueue (payload) {
  return {
    type: ENQUEUE,
    payload,
  }
}

// Convenience method assumed to be used most of the time by those wishing to
// send a notification.
export const notify = enqueue

export function dequeue (payload) {
  return {type: DEQUEUE}
}
