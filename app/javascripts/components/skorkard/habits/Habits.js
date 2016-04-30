/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import { map, forEach } from 'ramda';
import { div, ul, li } from '@motorcycle/dom';
import styles from './styles.scss';

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

function renderHabit(habit) {
	return li(`.${styles.habit}`, habit.name);
}

function render(state) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsContainer}`, [
				ul(`.${styles.positiveHabits}`, map(renderHabit, state.active.positiveHabits))
			]),
			div(`.${styles.negativeHabitsContainer}`, [
				ul(`.${styles.negativeHabits}`, map(renderHabit, state.active.negativeHabits))
			])
		])
	);
}

function view(state$) {
	return state$.map(render);
}

// COMPONENT

function Habits({ DOM, habitProps$ }) {
	const state$ = model(habitProps$);
	const vtree$ = view(state$);
	
	return {
		DOM: vtree$
	};
}

export default Habits;