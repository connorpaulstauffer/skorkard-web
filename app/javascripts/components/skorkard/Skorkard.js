/*jshint esversion: 6 */
import { just, combine, from } from 'most';
import { div, h1 } from '@motorcycle/dom';
import styles from './styles.scss';
import data from './../../../data';

import Score from './score/Score';
import Habits from './habits/Habits';
import Calendar from './calendar/Calendar';
import Analytics from './analytics/Analytics';

// VIEW

function render(state, scoreVtree, habitsVtree, calendarVtree, analyticsVtree) {
	return (
		div(`.${styles.skorkard}`, [
			div(`.${styles.leftColumn}`, [
				scoreVtree,
				habitsVtree
			]),
			div(`.${styles.rightColumn}`, [
				calendarVtree,
				analyticsVtree
			])
		])
	);
}

function view(state$, score, habits, calendar, analytics) {
	return combine(render, state$, score.DOM, habits.DOM, calendar.DOM, analytics.DOM);
}

// COMPONENT

function generateProps() {
	const habitProps$ = just({ 
		habits: data.habits, 
		activeHabitIds: data.activeHabits, 
		archivedHabitIds: data.archivedHabits 
	});
	const scoreProps$ = just({ history: data.history });
	
	return { habitProps$, scoreProps$ };
}

function renderChildren(DOM, habitProps$, scoreProps$) {
	const score = Score({ DOM, scoreProps$ });
	const habits = Habits({ DOM, habitProps$ });
	const calendar = Calendar({ DOM, scoreProps$ });
	const analytics = Analytics({ DOM, habitProps$, scoreProps$ });
	
	return { score, habits, calendar, analytics };
}

function Skorkard({ DOM }) {
	const { habitProps$, scoreProps$ } = generateProps();
	const { score, habits, calendar, analytics } = renderChildren(DOM, habitProps$, scoreProps$);
	
	const state$ = just(true);
	const vtree$ = view(state$, score, habits, calendar, analytics);
	
	return {
		DOM: vtree$
	};
}

export default Skorkard;