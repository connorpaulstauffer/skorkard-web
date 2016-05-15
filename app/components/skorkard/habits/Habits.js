/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import * as R from 'ramda';
import { div, ul, li } from '@motorcycle/dom';
import styles from './styles.scss';

import Habit from './habit/Habit';

// VIEW

function renderHabits(DOM, habitCollection, type) {
	return habitCollection.map(habitModel => Habit({ DOM, habitModel, type }).DOM);
}

function render(DOM, habitCollection) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, renderHabits(DOM, habitCollection.positive, 'positive'))
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, renderHabits(DOM, habitCollection.negative, 'negative'))
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