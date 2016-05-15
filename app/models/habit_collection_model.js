/*jshint esversion: 6 */
import createSubject from './../helpers/subject';
import { just } from 'most';
import * as R from 'ramda';
import HabitModel from './habit_model';
import data from './../data';

function processHabits(habits) {
	const sortByOrder = R.sortBy(R.prop('order'));
	const habitArray = sortByOrder(Object.keys(habits).map(id => habits[id]));
	const positive = habitArray.filter(habit => habit.score > 0).map(HabitModel);
	const negative = habitArray.filter(habit => habit.score < 0).map(HabitModel);
	
	return { positive, negative };
}

function createHabitCollection() {	
	return just(data.habits).map(processHabits);
}

function HabitCollectionModel() {
	const addHabit = habitData => true;
	const archiveHabit = id => true;
	const activateHabit = id => true;
	
	const habitCollection$ = createHabitCollection();
	
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