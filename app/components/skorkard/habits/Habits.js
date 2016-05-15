/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import * as R from 'ramda';
import { div, ul, li } from '@motorcycle/dom';
import styles from './styles.scss';

import Habit from './habit/Habit';

// MODEL

function splitHabits(ids, habits) {
	let positiveHabits = [];
	let negativeHabits = [];

	const pushHabit = habit => 
		habit.score > 0 ? positiveHabits.push(habit) : negativeHabits.push(habit);
	
	forEach(id => pushHabit(habits[id]), ids);
	
	return {
		positiveHabits,
		negativeHabits
	};
}

function processHabits({ habits, activeHabitIds, archivedHabitIds }) {
	return {
		active: splitHabits(activeHabitIds, habits),
		inactive: splitHabits(archivedHabitIds, habits)
	};
}

function model(habitProps$) {
	return habitProps$.map(processHabits);
}

// VIEW

function renderHabits(DOM, habitCollection, type) {
	return habitCollection.map(habitModel => Habit({ DOM, habitModel, type }).DOM);
}

function render(DOM, habitCollection) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, renderHabits(DOM, habitCollection, 'positive'))
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, renderHabits(DOM, habitCollection, 'negative'))
			])
		])
	);
}

function view(habitCollection$, DOM) {
	const renderWithDOM = R.curry(render)(DOM);
	
	return habitCollection$.map(renderWithDOM);
}

// COMPONENT

function Habits({ DOM, habitCollectionModel }) {
	const { habitCollection$, habitCollectionActions } = habitCollectionModel;
	
	return {
		DOM: view(habitCollection$, DOM)
	};
}

export default Habits;