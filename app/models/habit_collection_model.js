/*jshint esversion: 6 */
import createSubject from './../helpers/subject';
import { just } from 'most';
import * as R from 'ramda';
import HabitModel from './habit_model';
import data from './../data';

function createHabitDictionary() {
	return just(data.habits).map(habitData => R.map(HabitModel, habitData));
}

function createHabitCollection(habitDictionary$) {
	const activeHabitIds$ = just(data.activeHabits);
	const lookupHabit = (habitId, habitDictionary) => habitDictionary[habitId];
	
	return activeHabitIds$.combine(lookupHabit, habitDictionary$);
}

function HabitCollectionModel() {
	const addHabit = habitData => true;
	const archiveHabit = id => true;
	const activateHabit = id => true;
	
	const habitDictionary$ = createHabitDictionary();
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