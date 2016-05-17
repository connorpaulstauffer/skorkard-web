/*jshint esversion: 6 */
import { createModel } from './../helpers/model';
import { just } from 'most';

const historyMods = {
	ADD_OCCURRENCE: (history, { date, habitId }) =>
	 	evolve({ [date]: n => n + 1 }, history),
	REMOVE_OCCURRENCE: (history, { date, habitId }) =>
	 	evolve({ [date]: n => n - 1 }, history)
};

const HistoryModel = () => {
	const [history$, historyDispatch] = 
		createModel(historyMods, data.history);
	
	return { history$, historyDispatch };
};

export default HistoryModel;