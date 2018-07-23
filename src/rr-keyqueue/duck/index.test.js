/* global beforeEach, describe, it, expect */
import React from 'react'
import * as rrKeyqueue from './'
import {combineReducers, createStore} from 'redux'

describe('rr-keyqueue', () => {
  let store

  beforeEach(() => {
    store = createStore(combineReducers({
      [rrKeyqueue.REDUCER_KEY]: rrKeyqueue.reducer
    }))
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrKeyqueue.selectors().count).toEqual(0)
    })

    it('reducer will return a default object', () => {
      expect(rrKeyqueue.reducer()).toBeTruthy()
    })
  })

  it('works as expected', () => {
    let n = {target: <div />}
    store.dispatch(rrKeyqueue.enqueue(n))
    expect(rrKeyqueue.selectors(store.getState()).head).toEqual(n)
    // Need to ensure the event got cloned somewhere in the react update.
    expect(rrKeyqueue.selectors(store.getState()).head !== n).toEqual(true)
    expect(rrKeyqueue.selectors(store.getState()).count).toEqual(1)

    store.dispatch(rrKeyqueue.dequeue())
    expect(rrKeyqueue.selectors(store.getState()).head).toEqual(undefined)
    expect(rrKeyqueue.selectors(store.getState()).count).toEqual(0)

    store.dispatch(rrKeyqueue.reset())
    expect(rrKeyqueue.selectors(store.getState()).count).toEqual(0)
  })
})
