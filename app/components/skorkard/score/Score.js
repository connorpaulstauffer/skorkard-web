import { just } from 'most'
import { div } from '@motorcycle/dom'
import styles from './styles.scss'

// VIEW

const render = () => div(`.${styles.scoreContainer}`)

// COMPONENT

const Score = () => {
	const state$ = just(true)
	const vtree$ = state$.map(render)
	
	return {
		DOM: vtree$
	}
}

export default Score