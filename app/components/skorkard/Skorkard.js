import { just, combine } from 'most'
import { div } from '@motorcycle/dom'
import styles from './styles.scss'

import Score from './score/Score'
import Habits from './habits/Habits'
import Calendar from './calendar/Calendar'
import Analytics from './analytics/Analytics'

import HabitCollectionModel from './../../models/habit_collection_model'

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
	)
}

function view(state$, score, habits, calendar, analytics) {
	return combine(render, state$, score.DOM, habits.DOM, calendar.DOM, analytics.DOM)
}

// COMPONENT

function renderChildren(DOM, habitCollectionModel) {
	const score = Score({ DOM })
	const habits = Habits({ DOM, habitCollectionModel })
	const calendar = Calendar({ DOM })
	const analytics = Analytics({ DOM })
	
	return { score, habits, calendar, analytics }
}

function Skorkard({ DOM }) {
	const habitCollectionModel = HabitCollectionModel()

	const { score, habits, calendar, analytics } = renderChildren(DOM, habitCollectionModel)
	
	const state$ = just(true)
	const vtree$ = view(state$, score, habits, calendar, analytics)
		
	return {
		DOM: vtree$
	}
}

export default Skorkard