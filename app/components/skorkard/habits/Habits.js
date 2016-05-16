/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import * as R from 'ramda';
import { div, ul, li, form, input, button } from '@motorcycle/dom';
import styles from './styles.scss';
import { selector } from './../../../helpers/styles';

import Habit from './habit/Habit';

// INTENT

function createIntent(DOM, habitCollectionActions) {
	const nameValue$ = DOM.select(selector(styles.habitName))
		.events('input')
		.map(ev => ev.target.value);
		
	const scoreValue$ = DOM.select(selector(styles.habitScore))
		.events('input')
		.map(ev => parseInt(ev.target.value));
		
	const formValues = (name, score) => ({ name, score, active: true });
		
	const formSubmit = DOM.select(selector(styles.habitForm)).events('submit')
		.tap(ev => ev.preventDefault())
		.sample(formValues, nameValue$, scoreValue$)
		.tap(habitCollectionActions.addHabit)
		.drain();
}

// VIEW

function renderHabits(DOM, habitCollection, type) {
	return habitCollection.map(habitModel => Habit({ DOM, habitModel, type }).DOM);
}

function render(DOM, habitCollection) {
	const nameValue = 'test';
	const scoreValue = 'testn';
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsColumn}`, [
				ul(`.${styles.positiveHabits}`, renderHabits(DOM, habitCollection.positive, 'positive')),
				form(`.${styles.habitForm}`, [
					input(`.${styles.habitName}`, { 
						attrs: { type: 'text', value: '' },
						hook: { update: (_, newEl) => newEl.elm.value = '' }
					}),
					input(`.${styles.habitScore}`, { 
						attrs: { type: 'number', min: '1', value: '' },
						hook: { update: (_, newEl) => newEl.elm.value = '' }
					})
				])
			]),
			div(`.${styles.negativeHabitsColumn}`, [
				ul(`.${styles.negativeHabits}`, renderHabits(DOM, habitCollection.negative, 'negative')),
				form(`.${styles.habitForm}`, [
					input(`.${styles.habitName}`, { 
						attrs: { type: 'text', value: '' },
						hook: { update: (_, newEl) => newEl.elm.value = '' }
					}),
					input(`.${styles.habitScore}`, { 
						attrs: { type: 'number', max: '-1', value: '' },
						hook: { update: (_, newEl) => newEl.elm.value = '' }
					})
				])
			])
		])
	);
}

function view(habitCollection$, DOM, state) {
	const renderWithDOM = R.curry(render)(DOM);
	
	return habitCollection$.map(renderWithDOM);
}

// COMPONENT

function Habits({ DOM, habitCollectionModel }) {
	const { habitCollection$, habitCollectionActions } = habitCollectionModel;
	createIntent(DOM, habitCollectionActions);
	
	return {
		DOM: view(habitCollection$, DOM)
	};
}

export default Habits;