/*jshint esversion: 6 */
import { createModel } from './../helpers/model';
import { just } from 'most';
import { inc, dec } from 'ramda';

const historyMods = {
	ADD_OCCURRENCE: (history, { date, habitId }) =>
	 	evolve({ [date]: inc }, history),
	REMOVE_OCCURRENCE: (history, { date, habitId }) =>
	 	evolve({ [date]: dec }, history)
};

const HistoryModel = () => {
	const [history$, historyDispatch] = 
		createModel(historyMods, data.history);
	
	return { history$, historyDispatch };
};

export default HistoryModel;