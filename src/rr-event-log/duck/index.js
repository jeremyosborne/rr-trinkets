import * as constants from './constants'
import {isString, toString} from 'lodash'
import selectors from './selectors'

const REDUCER_KEY = constants.REDUCER_KEY
const DEFAULT_STATE = constants.DEFAULT_STATE

export {
  constants,
  REDUCER_KEY,
  selectors,
}

/**
 * Add a new event to the event queue.
 *
 * While the action is forgiving, our event system suggests a general format:
 *
 * {
 *    error: {Error} (optional) if exists, is expected to be an instance of Error
 *      and is likely used for debugging purposes.
 *    message: {String} human readable label or communication of event.
 *    timestamp: {Number} (optional) ms since epoch (while within redux store).
 *      Will be provided if not passed in.
 *    type: {String} (optional) a value indicating type, will be provided if
 *      not passed. Only two types are interpolated:
 *        - error: if the object is instanceof Error
 *        - info: default value
 *
 *    // other enumerable fields will merge into the event payload.
 * }
 *
 * @param {Error|Object|String} payload
 * @return {Object} Flux Standard Action
 */
export const ENQUEUE = `${REDUCER_KEY}/ENQUEUE`
export function enqueue (meta) {
  let payload
  if (isString(meta)) {
    // Message based.
    payload = {
      message: meta,
      timestamp: Date.now(),
      type: constants.EVENT_TYPES.INFO,
    }
  } else if (meta instanceof Error) {
    // Errors, perhaps they are being captured for remote logging when a console.log
    // won't do?
    payload = {
      error: meta,
      message: meta.message,
      timestamp: Date.now(),
      type: constants.EVENT_TYPES.ERROR,
    }
  } else {
    // Object based, assume caller passes correct structure.
    payload = {
      timestamp: Date.now(),
      type: constants.EVENT_TYPES.INFO,
      ...meta,
    }
    if (!payload.message) {
      payload.message = toString(meta) || constants.DEFAULT_MESSAGE
    }
  }
  return {
    type: ENQUEUE,
    payload,
  }
}

/**
 * Human friendly remapping, meant to act as a globally unique way of reporting
 * events.
 *
 * see: enqueue docs
 */
export const recordEvent = enqueue

/**
 * Return the log to the default empty state.
 *
 * @return Flux Standard Action
 */
export const RESET = `${REDUCER_KEY}/RESET`
export function reset (payload) {
  return {type: RESET}
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case ENQUEUE:
      return state.concat(action.payload)
    case RESET:
      return DEFAULT_STATE
    default:
      return state
  }
}
export default reducer
