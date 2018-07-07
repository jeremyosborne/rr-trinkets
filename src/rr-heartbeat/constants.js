// Where we assume our reducer will be located on the state tree.
export const REDUCER_KEY = 'rr-heartbeat'

export const DEFAULT_STATE = {
  // Total heartbeat events we have sent.
  count: 0,
  // {Number} ms delay between heartbeats.
  period: 1000,
  // True if we are periodically sending heartbeat events.
  running: false,

  // --- Timing info
  // {Number} Time in ms-since-epoch of our most recent heartbeat dispatched action.
  beat: -Infinity,
  // {Number} Time in ms-since-epoch of our most recent dispatched start action.
  start: -Infinity,
  // {Number} Time in ms-since-epoch of our most recent dispatched stop action.
  stop: -Infinity,
}
