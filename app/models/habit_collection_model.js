/*jshint esversion: 6 */
import createSubject from './../helpers/subject';
import { just } from 'most';
import * as R from 'ramda';
import HabitModel from './habit_model';
import data from './../data';

function processHabits(habits) {
	const sortByOrder = R.sortBy(R.prop('order'));
	const habitArray = sortByOrder(R.keys(habits).map(id => habits[id]));
	const positive = habitArray.filter(habit => habit.score > 0).map(HabitModel);
	const negative = habitArray.filter(habit => habit.score < 0).map(HabitModel);
	
	return { positive, negative };
}

function createHabitCollection(habitDictionary$) {	
	return habitDictionary$.map(processHabits);
}

function createHabitDictionary() {
	return just(data.habits);
}

function createHistory() {
	return just(data.history);
}

function createScores(history$, habitDictionary$) {
	return history$.combine(calculateScores, habitDictionary$);
}

function calculateScores(history, habitDictionary) {
	return R.map(counts => 
		R.sum(R.keys(counts).map(habitId => 
			counts[habitId] * habitDictionary[habitId].score)), history);
}

function HabitCollectionModel() {
	const addHabit = habitData => true;
	const archiveHabit = id => true;
	const activateHabit = id => true;
	
	const habitDictionary$ = createHabitDictionary();
	const history$ = createHistory();
	const scores$ = createScores(history$, habitDictionary$);
	const habitCollection$ = createHabitCollection(habitDictionary$);
	
	return {
		habitCollection$,
		habitCollectionActions: {
			addHabit,
			archiveHabit,
			activateHabit
		}
	};
}

export default HabitCollectionModel;