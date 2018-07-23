import {REDUCER_KEY, DEFAULT_STATE} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

/**
 * Add a key event to the queue of key events.
 *
 * @param {SyntheticEvent} payload a react synthetic event.
 *
 * @returns Flux Standard Action
 */
export const ENQUEUE = `${REDUCER_KEY}/ENQUEUE`
export function enqueue (payload) {
  const cloned = {}
  // Intentionally leaving off the hasOwnProperty check because we want everything
  // including non-enumerable.
  for (var k in payload) {
    // TODO: For the keyqueue implementation, we probably only want a subset copied.
    cloned[k] = payload[k]
  }
  return {
    type: ENQUEUE,
    // Need to copy, see: https://reactjs.org/docs/events.html#event-pooling
    payload: cloned,
  }
}

/**
 * Remove one item from the head of the queue.
 *
 * @return Flux standard Action
 */
export const DEQUEUE = `${REDUCER_KEY}/DEQUEUE`
export function dequeue (payload) {
  return {type: DEQUEUE}
}

/**
 * Return the queue to the default state.
 *
 * @return Flux Standard Action
 */
export const RESET = `${REDUCER_KEY}/RESET`
export function reset (payload) {
  return {type: RESET}
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case DEQUEUE:
      return state.slice(1)
    case ENQUEUE:
      return state.concat(action.payload)
    case RESET:
      return DEFAULT_STATE
    default:
      return state
  }
}
export default reducer
