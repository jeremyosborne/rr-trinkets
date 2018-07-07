import {REDUCER_KEY, DEFAULT_STATE} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

export const HEARTBEAT = 'rr-heartbeat/HEARTBEAT'
export const heartbeat = () => ({
  type: HEARTBEAT,
  payload: {
    beat: Date.now(),
  },
})

export const START = 'rr-heartbeat/START'
export const start = () => ({
  type: START,
  payload: {
    start: Date.now(),
    running: true,
  },
})

export const STOP = 'rr-heartbeat/STOP'
export const stop = () => ({
  type: stop,
  payload: {
    stop: Date.now(),
    running: false,
  },
})

export const createMiddleWare = () => (state) => (next) => (action) => {

}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case HEARTBEAT:
      return {
        ...state,
        ...action.payload,
        // Count means the number of received heartbeats, and is distinct from
        // when the heartbeat was created (which is why we don't handle it in the action).
        count: state.count + 1,
      }
    case START:
    case STOP:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
export default reducer
