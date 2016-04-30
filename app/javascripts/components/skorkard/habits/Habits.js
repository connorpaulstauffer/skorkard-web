/*jshint esversion: 6 */
import { just } from 'most';
import { div } from '@motorcycle/dom';
import styles from './styles.scss';

// VIEW

function view(state$) {
	return state$.map(state => 
		div(`.${styles.habitsContainer}`)
	);
}

// COMPONENT

function Habits({ DOM }) {
	const state$ = just(true);
	const vtree$ = view(state$);
	
	return {
		DOM: vtree$
	};
}

export default Habits;