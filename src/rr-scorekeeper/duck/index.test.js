/* global beforeEach, describe, expect, it */
import * as rrScorekeeper from './'
import {combineReducers, createStore} from 'redux'

describe('rr-scorekeeper', () => {
  let store

  beforeEach(() => {
    store = createStore(combineReducers(
      {
        [rrScorekeeper.REDUCER_KEY]: rrScorekeeper.reducer
      })
    )
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrScorekeeper.selectors().scores).toBeTruthy()
    })

    it('reducer will not explode return a default object', () => {
      expect(rrScorekeeper.reducer()).toBeTruthy()
    })
  })

  it('works as expected', () => {

  })
})
