import {createSelector, createStructuredSelector} from 'reselect'
import {REDUCER_KEY} from './constants'

const queue = (state = {}) => state[REDUCER_KEY] || []

export const count = createSelector(
  queue,
  (queue) => queue.length
)

export const head = createSelector(
  queue,
  (queue) => queue[0]
)

export default createStructuredSelector({
  count,
  head,
  queue,
})
