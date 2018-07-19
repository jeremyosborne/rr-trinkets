import {
  DEFAULT_STATE,
  REDUCER_KEY,
} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

export const RESET = 'rr-scorekeeper/RESET'
export const reset = () => ({type: RESET})

export const SET = 'rr-scorekeeper/SET'
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

export const SCORE = 'rr-scorekeeper/SCORE'
export const score = (payload) => {
  if (typeof payload === 'string') {
    // A single string represents a count increment of 1.
    payload = {payload: 1}
  }
  return {
    type: SCORE,
    payload,
  }
}

export const ZERO = 'rr-scorekeeper/ZERO'
export const zero = (payload) => {
  if (typeof payload === 'string') {
    // A single string is a single key to zero out.
    payload = [payload]
  }
  return {
    type: ZERO,
    payload,
  }
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case RESET:
      return DEFAULT_STATE
    case SCORE:
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
    case ZERO:
      return action.payload
        ? action.payload.reduce((scores, key) => {
          // Zero some scores if they exist.
          if (Object.prototype.hasOwnProperty.call(scores, key)) {
            scores[key] = 0
          }
          return scores
        }, {...state})
        : Object.keys(state).reduce((scores, key) => {
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
