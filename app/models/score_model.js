import { sum, keys, map } from 'ramda'

// HELPERS

const calculateScores = (history, habitDictionary) =>
  map(counts => 
    sum(keys(counts).map(habitId => 
      counts[habitId] * habitDictionary[habitId].score)), history)


// MODEL

const ScoreModel = (habitDictionary$, history$) => {
  const score$ = history$.combine(calculateScores, habitDictionary$)
  return { score$ }
}

export default ScoreModel