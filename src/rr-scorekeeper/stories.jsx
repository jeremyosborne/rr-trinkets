//
// Usage documentation for working with rrNotify.
//

import React from 'react'
import {connect, Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {storiesOf} from '@storybook/react'

import {rrScorekeeper} from './'

// Hook rrNotify into your store.
// You'll want to make use of the REDUCER_KEY, which by default is `rrNotify`,
// as the selectors depend on it.
const store = createStore(
  combineReducers({
    [rrScorekeeper.REDUCER_KEY]: rrScorekeeper.reducer
  }),
)

const PlusCatButton = connect(
  null, {
    score: rrScorekeeper.score,
  })(
  (props) => (
    <button onClick={() => props.score({cat: 1})}>Add One Cat</button>
  ))

const NegativeDogButton = connect(
  null, {
    score: rrScorekeeper.score,
  })(
  (props) => (
    <button onClick={() => props.score({dog: -Math.random()})}>Subtract Random Dog</button>
  ))

const SetWisePigButton = connect(
  null, {
    set: rrScorekeeper.set,
  })(
  (props) => (
    <button onClick={() => props.set({pig: 42})}>Set Wise Pig</button>
  ))

const ZeroCatButton = connect(
  null, {
    zero: rrScorekeeper.zero,
  })(
  (props) => (
    <button onClick={() => props.zero(['cat'])}>Zero Cat Score</button>
  ))

const ZeroAllButton = connect(
  null, {
    zero: rrScorekeeper.zero,
  })(
  (props) => (
    <button onClick={() => props.zero()}>Zero All Scores</button>
  ))

const ResetButton = connect(
  null, {
    reset: rrScorekeeper.reset,
  })(
  (props) => (
    <button onClick={() => props.reset()}>Reset The List of Scores</button>
  ))

const Info = connect(
  (state) => rrScorekeeper.selectors(state),
  null)(
  (props) => (
    <div>
      <h1>Scores</h1>
      {
        Object.keys(props.scores).length > 0
          ? Object.keys(props.scores).map((key) => (
            <p key={key}>{key}: {props.scores[key]}</p>
          ))
          : <p>No scores.</p>
      }
    </div>
  ))

storiesOf('rrScorekeeper visualized', module)
  .add('rrScorekeeper', () => (
    <Provider store={store}>
      <React.Fragment>
        <div>
          <PlusCatButton />
        </div>
        <div>
          <ZeroCatButton />
        </div>
        <div>
          <NegativeDogButton />
        </div>
        <div>
          <SetWisePigButton />
        </div>
        <div>
          <ZeroAllButton />
        </div>
        <div>
          <ResetButton />
        </div>
        <Info />
      </React.Fragment>
    </Provider>
  ))
