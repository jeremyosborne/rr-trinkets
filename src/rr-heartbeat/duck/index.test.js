/* global beforeEach, describe, expect, it, jest */
import * as rrHeartbeat from './'
import {applyMiddleware, combineReducers, createStore} from 'redux'

describe('rr-heartbeat', () => {
  let store

  beforeEach(() => {
    jest.useFakeTimers()
    store = createStore(combineReducers(
      {
        [rrHeartbeat.REDUCER_KEY]: rrHeartbeat.reducer
      }),
    applyMiddleware(rrHeartbeat.createMiddleware())
    )
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrHeartbeat.selectors().count).toEqual(0)
    })

    it('reducer will not explode return a default object', () => {
      expect(rrHeartbeat.reducer()).toBeTruthy()
    })
  })

  it('works as expected', () => {
    expect(rrHeartbeat.selectors(store.getState()).running).toEqual(false)
    store.dispatch(rrHeartbeat.start())
    expect(rrHeartbeat.selectors(store.getState()).running).toEqual(true)

    jest.runOnlyPendingTimers()

    expect(rrHeartbeat.selectors(store.getState()).count).toEqual(1)
    expect(rrHeartbeat.selectors(store.getState()).countCurrent).toEqual(1)

    store.dispatch(rrHeartbeat.stop())
    expect(rrHeartbeat.selectors(store.getState()).running).toEqual(false)

    // One way to make sure the timers are not running.
    jest.runOnlyPendingTimers()
    expect(rrHeartbeat.selectors(store.getState()).count).toEqual(1)
    expect(rrHeartbeat.selectors(store.getState()).countCurrent).toEqual(1)

    // Make sure we start a new period.
    store.dispatch(rrHeartbeat.start())
    expect(rrHeartbeat.selectors(store.getState()).running).toEqual(true)
    // New period keeps counts organized.
    jest.runOnlyPendingTimers()
    expect(rrHeartbeat.selectors(store.getState()).count).toEqual(2)
    expect(rrHeartbeat.selectors(store.getState()).countCurrent).toEqual(1)

    // Calling store twice does not start two timers.
    store.dispatch(rrHeartbeat.start())
    jest.runOnlyPendingTimers()
    expect(rrHeartbeat.selectors(store.getState()).count).toEqual(3)
    expect(rrHeartbeat.selectors(store.getState()).countCurrent).toEqual(2)
  })
})
