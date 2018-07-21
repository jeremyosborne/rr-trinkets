/* global beforeEach, describe, expect, it */
import * as rrScorekeeper from './'
import {DEFAULT_STATE} from './constants'
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
    store.dispatch(rrScorekeeper.set('cat', 1))
    store.dispatch(rrScorekeeper.set({dog: 2, pig: 3}))
    let scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(1)
    expect(scores.dog).toEqual(2)
    expect(scores.pig).toEqual(3)

    store.dispatch(rrScorekeeper.add('cat'))
    store.dispatch(rrScorekeeper.add({dog: 2, pig: -4, cow: 100}))
    scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(2)
    expect(scores.dog).toEqual(4)
    expect(scores.pig).toEqual(-1)
    expect(scores.cow).toEqual(100) // assumption that we shouldn't get NaN

    store.dispatch(rrScorekeeper.zero('cat'))
    scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(0)
    expect(scores.dog).toEqual(4)
    expect(scores.pig).toEqual(-1)
    store.dispatch(rrScorekeeper.zero(['dog']))
    scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(0)
    expect(scores.dog).toEqual(0)
    expect(scores.pig).toEqual(-1)
    store.dispatch(rrScorekeeper.zero({pig: 100, donkey: 500}))
    scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(0)
    expect(scores.dog).toEqual(0)
    expect(scores.pig).toEqual(0)
    expect(Object.prototype.hasOwnProperty.call(scores, 'donkey')).toEqual(false)
    store.dispatch(rrScorekeeper.add({cat: 42, dog: 2, pig: -4}))
    store.dispatch(rrScorekeeper.zero())
    scores = rrScorekeeper.selectors(store.getState()).scores
    expect(scores.cat).toEqual(0)
    expect(scores.dog).toEqual(0)
    expect(scores.pig).toEqual(0) // make sure zero all works

    store.dispatch(rrScorekeeper.reset())
    // Could check for empty, but whatever default is, over time, is what we prefer.
    expect(store.getState()[rrScorekeeper.REDUCER_KEY]).toEqual(DEFAULT_STATE)
  })
})
