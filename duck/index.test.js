/* global beforeEach, describe, it, expect */
import React from 'react'
import * as rrnotify from './'
import {combineReducers, createStore} from 'redux'

describe('rrnotify', () => {
  let store

  beforeEach(() => {
    store = createStore(combineReducers({
      [rrnotify.REDUCER_KEY]: rrnotify.reducer
    }))
  })

  describe('edge cases', () => {
    it('selectors should not explode and provide some default values', () => {
      expect(rrnotify.selectors().count).toEqual(0)
    })

    it('reducer will return a default object', () => {
      expect(rrnotify.reducer()).toBeTruthy()
    })
  })

  it('works as expected', () => {
    let n = {'message': 'the answer is 42'}
    store.dispatch(rrnotify.notify(n))

    expect(rrnotify.selectors(store.getState()).head).toEqual(n)
    expect(rrnotify.selectors(store.getState()).count).toEqual(1)

    store.dispatch(rrnotify.dequeue())
    expect(rrnotify.selectors(store.getState()).head).toEqual(undefined)
    expect(rrnotify.selectors(store.getState()).count).toEqual(0)

    // Remove _should_ remove all eqeqeq items, don't send the same object if
    // you don't want a mass-deletion.
    store.dispatch(rrnotify.notify(n))
    store.dispatch(rrnotify.notify(n))
    store.dispatch(rrnotify.notify(n))
    expect(rrnotify.selectors(store.getState()).count).toEqual(3)
    store.dispatch(rrnotify.remove(n))
    expect(rrnotify.selectors(store.getState()).count).toEqual(0)

    // Errors get set as errors.
    n = new Error('tell them about the twinkie')
    store.dispatch(rrnotify.notify(n))
    expect(rrnotify.selectors(store.getState()).head.message).toEqual(n.message)
    expect(rrnotify.selectors(store.getState()).head.type).toEqual('error')

    store.dispatch(rrnotify.reset())
    expect(rrnotify.selectors(store.getState()).count).toEqual(0)

    // Strings and React nodes get wrapped.
    n = 'what about the twinkie?'
    store.dispatch(rrnotify.notify(n))
    expect(rrnotify.selectors(store.getState()).head.message).toEqual(n)
    store.dispatch(rrnotify.reset())
    n = (<b>So be good, for goodness sake.</b>)
    store.dispatch(rrnotify.notify(n))
    expect(rrnotify.selectors(store.getState()).head.message).toEqual(n)
    store.dispatch(rrnotify.reset())
  })
})
