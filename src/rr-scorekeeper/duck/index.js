import {
  DEFAULT_STATE,
  REDUCER_KEY,
} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

/**
 * Reset to the default state.
 */
export const RESET = `${REDUCER_KEY}/RESET`
export const reset = () => ({type: RESET})

/**
 * Set a score, or a set of scores, to a specific value or values.
 *
 * @type {[type]}
 */
export const SET = `${REDUCER_KEY}/SET`
export const set = (...payload) => {
  if (payload.length === 2) {
    // Function called as set(key, value)
    payload = {[payload[0]]: payload[1]}
  } else {
    // Function called as map of (key, value)
    payload = payload[0]
  }
  return {
    type: SET,
    payload,
  }
}

/**
 * Add to the score.
 *
 * @param {mixed} payload if type is a string, adds one point to the value associated
 * with that name. If type is an object, values must be numbers, and the value is added
 * to the map of scores (or set if not yet exists).
 */
export const ADD = `${REDUCER_KEY}/ADD`
export const add = (payload) => {
  if (typeof payload === 'string') {
    // A single string represents a count increment of 1.
    payload = {[payload]: 1}
  }
  return {
    type: ADD,
    payload,
  }
}

/**
 * Zero out specific or all scores.
 *
 * @param {mixed} payload if string, zeroes out that specific score if it exists.
 * If array, each value in the array will be treated as a key in the scores map
 * and zeroed out if it exists. If no argument is passed, all existing scores
 * will be zeroed out (this is distinct from resetting which also removes existing
 * keys from the score map). If argument is object, keys will be treated as score
 * keys to be zeroed out.
 */
export const ZERO_SOME = `${REDUCER_KEY}/ZERO/SOME`
export const ZERO_ALL = `${REDUCER_KEY}/ZERO/ALL`
export const zero = (payload) => {
  if (!payload) {
    return {type: ZERO_ALL}
  }
  if (typeof payload === 'string') {
    // A single string is a single key to zero out.
    payload = [payload]
  } else if (!Array.isArray(payload)) {
    // Give benefit of the doubt that if here and not array, we are to use keys
    // from object-as-map to zero out.
    payload = Object.keys(payload)
  }
  return {
    type: ZERO_SOME,
    payload,
  }
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case RESET:
      return DEFAULT_STATE
    case ADD:
      return Object.keys(action.payload).reduce((scores, key) => {
        if (Object.prototype.hasOwnProperty.call(scores, key)) {
          // Existing scores are always added to.
          scores[key] += action.payload[key]
        } else {
          // Non-existent scores are set.
          scores[key] = action.payload[key]
        }
        return scores
      }, {...state})
    case SET:
      return Object.keys(action.payload).reduce((scores, key) => {
        // Replaces existing value or sets new value.
        scores[key] = action.payload[key]
        return scores
      }, {...state})
    case ZERO_SOME:
      return action.payload.reduce((scores, key) => {
        // Zero some scores if they exist.
        if (Object.prototype.hasOwnProperty.call(scores, key)) {
          scores[key] = 0
        }
        return scores
      }, {...state})
    case ZERO_ALL:
      return Object.keys(state).reduce((scores, key) => {
        // Zero all scores that exist.
        if (Object.prototype.hasOwnProperty.call(scores, key)) {
          scores[key] = 0
        }
        return scores
      }, {...state})
    default:
      return state
  }
}
export default reducer
