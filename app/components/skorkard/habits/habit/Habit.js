/*jshint esversion: 6 */
import { li } from '@motorcycle/dom';
import styles from './styles.scss';

// VIEW

function view(habit$, type) {
	const className = type === 'positive' ? styles.positiveHabit : styles.negativeHabit;

	return habit$.map(habit => li(`.${className}`, habit.name));
}

// COMPONENT

function Habit({ DOM, habitModel, type }) {
	const { habit$, habitActions$ } = habitModel;
	
	return {
		DOM: view(habit$, type)
	};
}

export default Habit;