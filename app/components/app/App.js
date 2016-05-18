import { just, combine } from 'most'
import { div } from '@motorcycle/dom'
import styles from './styles.scss'

import Navbar from './../navbar/Navbar'
import Skorkard from './../skorkard/Skorkard'

// VIEW

const render = (state, navbarVtree, skorkardVtree) => (
	div(`.${styles.app}`, [
		navbarVtree,
		skorkardVtree
	])
)

const view = (state$, navbar, skorkard) =>
	combine(render, state$, navbar.DOM, skorkard.DOM)

// COMPONENT

const renderChildren = (DOM) => {
	const appProps$ = just(true)
	
	const navbar = Navbar({ DOM, appProps$ })
	const skorkard = Skorkard({ DOM })
	
	return { navbar, skorkard }	
}

const App = ({ DOM }) => {
	const { navbar, skorkard } = renderChildren(DOM)
	
	const state$ = just(true)
	const vtree$ = view(state$, navbar, skorkard)
	
	return {
		DOM: vtree$
	}
}

export default App