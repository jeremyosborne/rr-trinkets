/* global beforeEach, describe, it, expect */
import * as rrEventLog from './'
import {combineReducers, createStore} from 'redux'

describe('rr-event-log', () => {
  let store

  beforeEach(() => {
    store = createStore(combineReducers({
      [rrEventLog.REDUCER_KEY]: rrEventLog.reducer
    }))
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrEventLog.selectors().count).toEqual(0)
    })

    it('reducer will return a default object', () => {
      expect(rrEventLog.reducer()).toBeTruthy()
    })
  })

  it('flow works as expected', () => {
    let n = {'message': 'the answer is 42'}
    store.dispatch(rrEventLog.recordEvent(n))
    // The store should not care about duplicate events.
    store.dispatch(rrEventLog.recordEvent(n))
    expect(rrEventLog.selectors(store.getState()).count).toEqual(2)

    store.dispatch(rrEventLog.reset())
    expect(rrEventLog.selectors(store.getState()).count).toEqual(0)
  })

  describe('constants', () => {
    it('upholds documented contracts', () => {
      expect(rrEventLog.constants.EVENT_TYPES.ERROR).toEqual('error')
      expect(rrEventLog.constants.EVENT_TYPES.INFO).toEqual('info')
      expect(rrEventLog.constants.DEFAULT_MESSAGE).toBeTruthy()
    })
  })

  describe('recordEvent()', () => {
    it('handles Errors as expected', () => {
      const ev = new Error('tell them about the twinkie')
      const a = rrEventLog.recordEvent(ev)
      expect(a.type).toBeTruthy()
      // Only for errors.
      expect(a.payload.error).toEqual(ev)
      expect(a.payload.message).toEqual(ev.message)
      expect(a.payload.timestamp >= 0).toBeTruthy()
      expect(a.payload.type).toEqual(rrEventLog.constants.EVENT_TYPES.ERROR)
    })

    it('handles objects as expected', () => {
      const ev = {'message': 'the answer is 42', dog: 'cat'}
      const a = rrEventLog.recordEvent(ev)
      expect(a.type).toBeTruthy()
      expect(a.payload.message).toEqual(ev.message)
      expect(a.payload.timestamp >= 0).toBeTruthy()
      expect(a.payload.type).toEqual(rrEventLog.constants.EVENT_TYPES.INFO)
      // Other properties are mapped as is.
      expect(a.payload.dog).toEqual(ev.dog)
    })

    it('handles objects without a message property', () => {
      const ev = {
        type: 'custom',
        toString: () => {
          return 'serialized message'
        },
      }
      const a = rrEventLog.recordEvent(ev)
      expect(a.type).toBeTruthy()
      expect(a.payload.message).toEqual(ev.toString())
      expect(a.payload.timestamp >= 0).toBeTruthy()
      expect(a.payload.type).toEqual(ev.type)
    })

    it('handles strings as expected', () => {
      const ev = 'what about the twinkie?'
      const a = rrEventLog.recordEvent(ev)
      expect(a.type).toBeTruthy()
      expect(a.payload.message).toEqual(ev)
      expect(a.payload.timestamp >= 0).toBeTruthy()
      expect(a.payload.type).toEqual(rrEventLog.constants.EVENT_TYPES.INFO)
    })
  })
})
