/*jshint esversion: 6 */
import isolate from '@cycle/isolate';
import { form, input, button } from '@motorcycle/dom';
import styles from './styles.scss';
import { selector } from './../../../../helpers/styles';

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
		.tap(ev => ev.preventDefault() && console.log('submitted'))
		.sample(formValues, nameValue$, scoreValue$)
		.tap(habitCollectionActions.addHabit)
		.drain();
}

// VIEW

function view() {
	return (
		form(`.${styles.habitForm}`, [
			input(`.${styles.habitName}`, { 
				attrs: { type: 'text', value: '' },
				hook: { update: (_, newEl) => newEl.elm.value = '' }
			}),
			input(`.${styles.habitScore}`, { 
				attrs: { type: 'number', max: '-1', value: '' },
				hook: { update: (_, newEl) => newEl.elm.value = '' }
			}),
			button(`.${styles.submitButton}`, { attrs: { type: 'submit' } })
		])
	);
}

// COMPONENT

function HabitForm(DOM, habitCollectionActions) {
	createIntent(DOM, habitCollectionActions);
	
	return {
		DOM: view()
	};
}

export default isolate(HabitForm);