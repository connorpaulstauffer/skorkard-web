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

function render(DOM, habitCollection, positiveHabitsFormVtree, negativeHabitsFormVtree) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				positiveHabitsFormVtree,
				ul(`.${styles.positiveHabits}`, renderHabits(DOM, habitCollection.positive, 'positive'))
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				negativeHabitsFormVtree,
				ul(`.${styles.negativeHabits}`, renderHabits(DOM, habitCollection.negative, 'negative'))
			])
		])
	);
}

function view(habitCollection$, DOM, positiveHabitsForm, negativeHabitsForm) {
	const renderWithDOM = R.curry(render)(DOM);

	return habitCollection$.combine(renderWithDOM, positiveHabitsForm.DOM, negativeHabitsForm.DOM);
}

// COMPONENT

function Habits({ DOM, habitCollectionModel }) {
	const { habitCollection$, habitCollectionActions } = habitCollectionModel;
	const positiveHabitsForm = HabitForm(DOM, habitCollectionActions, 'positive');
	const negativeHabitsForm = HabitForm(DOM, habitCollectionActions, 'negative');
	
	return {
		DOM: view(habitCollection$, DOM, positiveHabitsForm, negativeHabitsForm)
	};
}

export default Habits;