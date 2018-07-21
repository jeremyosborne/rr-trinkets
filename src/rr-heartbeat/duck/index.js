import {
  DEFAULT_STATE,
  REDUCER_KEY,
} from './constants'
import selectors from './selectors'

export {
  REDUCER_KEY,
  selectors,
}

export const HEARTBEAT = `${REDUCER_KEY}/HEARTBEAT`
export const heartbeat = () => ({
  type: HEARTBEAT,
  payload: {
    beat: Date.now(),
  },
})

export const START = `${REDUCER_KEY}/START`
export const start = () => ({
  type: START,
  payload: {
    start: Date.now(),
    running: true,
    // Resets the count for this batch of heartbeats.
    countCurrent: 0,
  },
})

export const STOP = `${REDUCER_KEY}/STOP`
export const stop = () => ({
  type: STOP,
  payload: {
    stop: Date.now(),
    running: false,
  },
})

//
// Handle the start / stop, and periodic heartbeats.
//
// We chose the middleware approach because it has access to the store and can
// send heartbeat actions as well as encapsulate the timer logic.
export function createMiddleware () {
  let intervalId

  const responders = {
    [START]: ({store}) => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          store.dispatch(heartbeat())
        }, selectors(store.getState()).period)
      }
    },
    [STOP]: () => {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return (store) => (next) => (action) => {
    // If someone multi-calls start, ignore it.
    // Restart consists of a stop then start.
    if (action.type === START && intervalId) {
      return
    }
    // Maybe start or stop our timer...
    responders[action.type] && responders[action.type]({store})
    next(action)
  }
}

export function reducer (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case HEARTBEAT:
      return {
        ...state,
        ...action.payload,
        // We handle count here because while we love redux-thunk, we wanted this
        // module to be able to live without it.
        count: state.count + 1,
        countCurrent: state.countCurrent + 1
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
