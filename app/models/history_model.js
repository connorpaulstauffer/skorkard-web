
import { createModel } from './../helpers/model'
import { inc, dec, evolve } from 'ramda'
import data from './../data'

const transformCount = (history, date, habitId, transform) =>
	evolve({ [date]: { [habitId]: transform } }, history)
	
const historyMods = {
	ADD_OCCURRENCE: (history, { date, habitId }) =>
		transformCount(history, date, habitId, inc),
	REMOVE_OCCURRENCE: (history, { date, habitId }) =>
		transformCount(history, date, habitId, dec)
}

const HistoryModel = () => {
	const [history$, historyDispatch] = 
		createModel(historyMods, data.history)

	return { history$, historyDispatch }
}

export default HistoryModel
