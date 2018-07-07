import {
  // createSelector,
  createStructuredSelector,
} from 'reselect'
import {REDUCER_KEY, DEFAULT_STATE} from './constants'

const state = (state = {}) => state[REDUCER_KEY] || {...DEFAULT_STATE}

export default createStructuredSelector({
  state,
})
