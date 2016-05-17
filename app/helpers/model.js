/*jshint esversion: 6 */
import { createSubject } from './subject'

const createModel = (mods, initialValue) => {
	const [actions$, actionObserver] = createSubject()
	const executeAction = (model, action) => 
		mods[action.name](model, action.data)
	const model$ = actions$.scan(executeAction, initialValue)
	const dispatch = (name, data) => actionObserver.next({ name, data })
	
	return [model$, dispatch]
}

module.exports = {
	createModel
}