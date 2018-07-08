import {
  createSelector,
  createStructuredSelector,
} from 'reselect'
import {DEFAULT_STATE, REDUCER_KEY} from './constants'

export const state = (state = {}) => state[REDUCER_KEY] || {...DEFAULT_STATE}

export const count = createSelector(
  state,
  (state) => state.count || 0
)

export const countCurrent = createSelector(
  state,
  (state) => state.countCurrent || 0
)

export const period = createSelector(
  state,
  (state) => state.period || DEFAULT_STATE.period
)

export const running = createSelector(
  state,
  (state) => !!state.running
)

// Drift of the current hearbeat cycle by comparing how many beats we actually
// have vs. how many beats we expect to have.
export const drift = createSelector(
  state,
  period,
  countCurrent,
  (state, period, countCurrent) => {
    if (countCurrent > 0 && state.start > -Infinity && state.beat > -Infinity) {
      const recentHeartbeats = (state.beat - state.start) / period
      return -(countCurrent - recentHeartbeats)
    }
    return 0
  }
)

export default createStructuredSelector({
  count,
  countCurrent,
  drift,
  period,
  running,
  state,
})
