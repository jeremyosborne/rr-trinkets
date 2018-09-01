import * as rrEventLog from './duck'

// Main default API, and likely used more than other portions of the API.
const recordEvent = rrEventLog.recordEvent

export {
  recordEvent,
  rrEventLog,
}
