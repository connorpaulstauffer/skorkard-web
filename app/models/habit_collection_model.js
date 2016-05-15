/*jshint esversion: 6 */
import createSubject from './../helpers/subject';
import { just } from 'most';
import * as R from 'ramda';
import HabitModel from './habit_model';
import data from './../data';

function createHabitDictionary() {
	return just(data.habits).map(habitData => R.map(HabitModel, habitData));
}

function lookupHabits(habitIds, habitDictionary) {
	return habitIds.map(habitId => habitDictionary[habitId]);
}

function createHabitCollection(habitDictionary$) {
	const activeHabitIds$ = just(data.activeHabits);
	
	return activeHabitIds$.combine(lookupHabits, habitDictionary$);
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