/*jshint esversion: 6 */
import { form, input, button, div } from '@motorcycle/dom'
import { just } from 'most'
import styles from './styles.scss'
import { selector } from './../../../../helpers/styles'

// INTENT

const createIntent = (DOM, habitDispatch, type) => {
	const nameValue$ = DOM.select(`.${type}`).select(selector(styles.habitName))
		.events('input')
		.map(ev => ev.target.value)
		
	const scoreValue$ = DOM.select(`.${type}`).select(selector(styles.habitScore))
		.events('input')
		.map(ev => parseInt(ev.target.value))
		.startWith(defaultValue(type))
		
	const formValues = (name, score) => ({ name, score, active: true })
		
	const formSubmit$ = DOM.select(`.${type}`).select(selector(styles.habitForm))
		.events('submit')
		.tap(ev => ev.preventDefault())
		.sample(formValues, nameValue$, scoreValue$)
		.tap(habit => habitDispatch('ADD_HABIT', habit))
		
	return formSubmit$
}

// VIEW

const maxValue = type => type === 'positive' ? '' : -1
const minValue = type => type === 'positive' ? 1 : ''
const defaultValue = type => type === 'positive' ? 1 : -1

const render = type => (
	form(`.${styles.habitForm} ${type}`, [
		div(`.${styles.habitNameWrapper}`, [
			input(`.${styles.habitName}`, { 
				attrs: { type: 'text', value: '' },
				hook: { update: (_, newEl) => {
					newEl.elm.value = ''
					newEl.elm.focus()
				}}
			})
		]),
		div(`.${styles.habitScoreWrapper}`, [
			input(`.${styles.habitScore}`, { 
				attrs: { 
					type: 'number', 
					max: maxValue(type), 
					min: minValue(type), 
					value: defaultValue(type) 
				}
			})
		]),
		// hidden button hack to submit form
		button(`.${styles.submitButton}`, { attrs: { type: 'submit' } })
	])
)

const view = (type, formSubmit$) =>
	just(true).concat(formSubmit$).map(_ => render(type))

// COMPONENT

const HabitForm = (DOM, habitDispatch, type) => {
	const formSubmit$ = createIntent(DOM, habitDispatch, type)
	
	return {
		DOM: view(type, formSubmit$)
	}
}

export default HabitForm