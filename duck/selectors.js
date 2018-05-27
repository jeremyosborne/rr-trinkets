import {createSelector, createStructuredSelector} from 'reselect'
import {REDUCER_KEY} from './constants'

const queue = (state) => state[REDUCER_KEY] || []

// Total number of messages.
export const count = createSelector(
  queue,
  (queue) => queue.length
)

// Which message is next? May return anything including undefined, better to
// use count to determine if there are messages to show.
export const head = createSelector(
  queue,
  (queue) => queue[0]
)

export default createStructuredSelector({
  count,
  head,
  queue,
})
