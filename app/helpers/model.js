/*jshint esversion: 6 */
import { createSubject } from './subject';

const createModel = (mods, initialValue) => {
	const [actions$, actionObserver] = createSubject();
	const executeAction = (model, action) => mods[action](model, data);
	const model$ = actions$.scan(executeAction, initialValue);
	
	return [model$, actionObserver];
};

module.exports = {
	createModel
};