import {
  createStructuredSelector,
} from 'reselect'
import {DEFAULT_STATE, REDUCER_KEY} from './constants'

// The state consists of scores, and that's it.
export const scores = (state = {}) => state[REDUCER_KEY] || {...DEFAULT_STATE}

export default createStructuredSelector({
  scores
})
