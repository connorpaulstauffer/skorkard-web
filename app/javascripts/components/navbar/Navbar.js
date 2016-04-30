/*jshint esversion: 6 */
import { just, combine } from 'most';
import { div, h1 } from '@motorcycle/dom';
import styles from './styles.scss';

// VIEW

function render(state, appProps) {
	return (
		div(`.${styles.navbar}`, [
			div(`.${styles.navbarItem}`, [
				h1(`.${styles.logo}`, 'Skorkard')
			])
		])
	);
}

function view(state$, appProps$) {
	return combine(render, state$, appProps$);
}

// COMPONENT

function Navbar({ DOM, appProps$ }) {
	const state$ = just(true);
	const vtree$ = view(state$, appProps$);
	
	return {
		DOM: vtree$
	};
}

export default Navbar;