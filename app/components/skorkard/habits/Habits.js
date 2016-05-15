/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import * as R from 'ramda';
import { div, ul, li } from '@motorcycle/dom';
import styles from './styles.scss';

// VIEW

function renderHabit(type, habit) {
	const { habit$, habitActions } = habit;
	const className = type === 'positive' ? styles.positiveHabit : styles.negativeHabit;

	return habit$.map(habit => li(`.${className}`, habit.name));
}

const renderPositiveHabit = (habit) => renderHabit('positive', habit);
const renderNegativeHabit = (habit) => renderHabit('negative', habit);

function render(habitCollection) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, habitCollection.map(renderPositiveHabit))
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, habitCollection.map(renderNegativeHabit))
			])
		])
	);
}

function view(habitCollection$) {
	return habitCollection$.map(render);
}

// COMPONENT

function Habits({ DOM, habitCollectionModel }) {
	const { habitCollection$, habitCollectionActions } = habitCollectionModel;
	
	return {
		DOM: view(habitCollection$)
	};
}

export default Habits;