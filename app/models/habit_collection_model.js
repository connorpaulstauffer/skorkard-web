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

const maxInArray = arr => R.last(R.sort((a, b) => a - b, arr.map(Number)));
const nextHabitKey = habits => maxInArray(R.keys(habits)) + 1;
const nextHabitOrder = habits => maxInArray(R.values(R.map(R.prop('order'), habits))) + 1;

function createHabitDictionary(newHabits$) {
	const dict$ =  newHabits$.scan(
		(habits, newHabit) => 
			R.merge(habits, { 
				[nextHabitKey(habits)]: R.merge(R.clone(newHabit), { order: nextHabitOrder(habits) }) 
			}), data.habits);
	return dict$;
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
	const [newHabits$, newHabitObserver] = createSubject();
	const addHabit = habitData => newHabitObserver.next(habitData);
	const archiveHabit = id => true;
	const activateHabit = id => true;
	
	const habitDictionary$ = createHabitDictionary(newHabits$);
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