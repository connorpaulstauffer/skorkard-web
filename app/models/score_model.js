/*jshint esversion: 6 */
import { createModel } from './../helpers/model'
import { map } from 'ramda'
import { just } from 'most'

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

export default HistoryModel