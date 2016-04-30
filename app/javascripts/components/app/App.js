/*jshint esversion: 6 */
import { just, combine } from 'most';
import { div } from '@motorcycle/dom';
import styles from './styles.scss';

import Navbar from './../navbar/Navbar';
import Skorkard from './../skorkard/Skorkard';

// VIEW

function render(state, navbarVtree, skorkardVtree) {
	return (
		div(`.${styles.app}`, [
			navbarVtree,
			skorkardVtree
		])
	);
}

function view(state$, navbar, skorkard) {
	return combine(render, state$, navbar.DOM, skorkard.DOM);
}

// COMPONENT

function renderChildren(DOM) {
	const appProps$ = just(true);
	const habitProps$ = just(true);
	const scoreProps$ = just(true);
	
	const navbar = Navbar({ DOM, appProps$ });
	const skorkard = Skorkard({ DOM, habitProps$, scoreProps$ });
	
	return { navbar, skorkard };
}

function App({ DOM }) {
	const { navbar, skorkard } = renderChildren(DOM);
	
	const state$ = just(true);
	const vtree$ = view(state$, navbar, skorkard);
	
	return {
		DOM: vtree$
	};
}

export default App;