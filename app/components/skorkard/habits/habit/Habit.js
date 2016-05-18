import { li } from '@motorcycle/dom'
import styles from './styles.scss'

// VIEW

const className = type => 
	type === 'positive' ? styles.positiveHabit : styles.negativeHabit

const view = (habit, type) => li(`.${className(type)}`, habit.name)

// COMPONENT

const Habit = (DOM, habit, type) => {
	return {
		DOM: view(habit, type)
	}
}

export default Habit