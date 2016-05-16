/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import * as R from 'ramda';
import { div, ul } from '@motorcycle/dom';
import styles from './styles.scss';
import { selector } from './../../../helpers/styles';

import Habit from './habit/Habit';
import HabitForm from './habit_form/HabitForm';

// VIEW

function renderHabits(DOM, habitCollection, type) {
	return habitCollection.map(habitModel => Habit({ DOM, habitModel, type }).DOM);
}

function render(DOM, habitCollectionActions, habitCollection) {
	const nameValue = 'test';
	const scoreValue = 'testn';
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, renderHabits(DOM, habitCollection.positive, 'positive')),
				HabitForm(DOM, habitCollectionActions).DOM
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, renderHabits(DOM, habitCollection.negative, 'negative')),
				HabitForm(DOM, habitCollectionActions).DOM
			])
		])
	);
}

function view(habitCollection$, habitCollectionActions, DOM) {
	const renderWithDOM = R.curry(render)(DOM, habitCollectionActions);
	
	return habitCollection$.map(renderWithDOM);
}

// COMPONENT

function Habits({ DOM, habitCollectionModel }) {
	const { habitCollection$, habitCollectionActions } = habitCollectionModel;
	
	return {
		DOM: view(habitCollection$, habitCollectionActions, DOM)
	};
}

export default Habits;