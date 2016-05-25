import { just } from 'most'
import { div, h1 } from '@motorcycle/dom'
import styles from './styles.scss'

// VIEW

const render = () => (
  div(`.${styles.navbar}`, [
    div(`.${styles.navbarItem}`, [
      h1(`.${styles.logo}`, 'Skorkard')
    ])
  ])
)

// COMPONENT

const Navbar = () => {
  const state$ = just(true)
  const vtree$ = state$.map(render)
  
  return {
    DOM: vtree$
  }
}

export default Navbar