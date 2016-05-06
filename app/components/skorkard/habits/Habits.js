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

function renderHabit(type, habit) {
	const className = type === 'positive' ? styles.positiveHabit : styles.negativeHabit;
	return li(`.${className}`, habit.name);
}

function render(state) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, 
					map(renderHabit.bind(null, 'positive'), state.active.positiveHabits))
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, 
					map(renderHabit.bind(null, 'negative'), state.active.negativeHabits))
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