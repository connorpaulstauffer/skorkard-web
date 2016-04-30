/*jshint esversion: 6 */
import { combine, just, from } from 'most';
import { div, ul, li } from '@motorcycle/dom';
import styles from './styles.scss';

// MODEL

// function splitHabits(habits) {
// 	let positiveHabits = [];
// 	let negativeHabits = [];
// 	
// 	for (let key in habits.habits) {
// 		if (habits.habits[key].score > 0) {
// 			positiveHabits.push(habits.habits[key]);
// 		} else {
// 			negativeHabits.push(habits.habits[key]);
// 		}
// 	}
// 	
// 	return {
// 		positiveHabits,
// 		negativeHabits
// 	};
// }

function model(habitProps$) {
	// const habits$ = habitProps$;
	const habits$ = habitProps$.map(prop => prop.habits);
	// habits$.observe(console.log.bind(console));
	const activeHabitsIds$ = habitProps$.map(prop => from(prop.activeHabitIds)).join();
	// activeHabitsIds$.observe(console.log.bind(console));
	const activeHabits$ = combine((id, habits) => habits[id], activeHabitsIds$, habits$);
	// activeHabits$.observe(console.log.bind(console));
	
	return just({ activeHabits$ });
}

// VIEW

function renderHabit(habit) {
	console.log(habit);
	return li(`.${styles.habit}`, habit.name);
}

function render(state) {
	return (
		div(`.${styles.habitsContainer}`, [
			div(`.${styles.positiveHabitsContainer}`, 
				ul(`.${styles.positiveHabits}`, [
					state.activeHabits$.map(renderHabit)
				])
			),
			div(`.${styles.negativeHabitsContainer}`)
		])
	);
}

function view(state$) {
	return state$.map(render);
}

// COMPONENT

function renderChildren(DOM, habitProps$) {
	
}

function Habits({ DOM, habitProps$ }) {
	const { positiveHabits, negativeHabits } = renderChildren(DOM, habitProps$);
	const state$ = model(habitProps$);
	const vtree$ = view(state$);
	
	return {
		DOM: vtree$
	};
}

export default Habits;