// Where we assume our reducer will be located on the state tree.
export const REDUCER_KEY = 'rr-event-log'

export const DEFAULT_STATE = []

// Canonical types, shouldn't be needed in the normal course of things.
export const EVENT_TYPES = {
  INFO: 'info',
  ERROR: 'error',
}

// If for some reason we can't produce a string for the message, this is the
// string we will show, and callers can attempt to detect default / missing
// messages.
export const DEFAULT_MESSAGE = 'message not found'
