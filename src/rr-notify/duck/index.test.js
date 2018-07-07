/* global beforeEach, describe, it, expect */
import React from 'react'
import * as rrNotify from './'
import {combineReducers, createStore} from 'redux'

describe('rr-notify', () => {
  let store

  beforeEach(() => {
    store = createStore(combineReducers({
      [rrNotify.REDUCER_KEY]: rrNotify.reducer
    }))
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrNotify.selectors().count).toEqual(0)
    })

    it('reducer will return a default object', () => {
      expect(rrNotify.reducer()).toBeTruthy()
    })
  })

  it('works as expected', () => {
    let n = {'message': 'the answer is 42'}
    store.dispatch(rrNotify.notify(n))

    expect(rrNotify.selectors(store.getState()).head).toEqual(n)
    expect(rrNotify.selectors(store.getState()).count).toEqual(1)

    store.dispatch(rrNotify.dequeue())
    expect(rrNotify.selectors(store.getState()).head).toEqual(undefined)
    expect(rrNotify.selectors(store.getState()).count).toEqual(0)

    // Remove _should_ remove all eqeqeq items, don't send the same object if
    // you don't want a mass-deletion.
    store.dispatch(rrNotify.notify(n))
    store.dispatch(rrNotify.notify(n))
    store.dispatch(rrNotify.notify(n))
    expect(rrNotify.selectors(store.getState()).count).toEqual(3)
    store.dispatch(rrNotify.remove(n))
    expect(rrNotify.selectors(store.getState()).count).toEqual(0)

    // Errors get set as errors.
    n = new Error('tell them about the twinkie')
    store.dispatch(rrNotify.notify(n))
    expect(rrNotify.selectors(store.getState()).head.message).toEqual(n.message)
    expect(rrNotify.selectors(store.getState()).head.type).toEqual('error')

    store.dispatch(rrNotify.reset())
    expect(rrNotify.selectors(store.getState()).count).toEqual(0)

    // Strings and React nodes get wrapped.
    n = 'what about the twinkie?'
    store.dispatch(rrNotify.notify(n))
    expect(rrNotify.selectors(store.getState()).head.message).toEqual(n)
    store.dispatch(rrNotify.reset())
    n = (<b>So be good, for goodness sake.</b>)
    store.dispatch(rrNotify.notify(n))
    expect(rrNotify.selectors(store.getState()).head.message).toEqual(n)
    store.dispatch(rrNotify.reset())
  })
})
