import {createSelector, createStructuredSelector} from 'reselect'
import {REDUCER_KEY} from './constants'

const queue = (state = {}) => state[REDUCER_KEY] || []

// Total number of events.
export const count = createSelector(
  queue,
  (queue) => queue.length
)

export default createStructuredSelector({
  count,
  queue,
})
