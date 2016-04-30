/*jshint esversion: 6 */
import { just, combine } from 'most';
import { div, h1 } from '@motorcycle/dom';
import styles from './styles.scss';

// VIEW

function render(state, habitProps, scoreProps) {
	return (
		div(`.${styles.skorkard}`)
	);
}

function view(state$, habitProps$, scoreProps$) {
	return combine(render, state$, habitProps$, scoreProps$);
}

// COMPONENT

function Skorkard({ DOM, habitProps$, scoreProps$ }) {
	const state$ = just(true);
	const vtree$ = view(state$, habitProps$, scoreProps$);
	
	return {
		DOM: vtree$
	};
}

export default Skorkard;