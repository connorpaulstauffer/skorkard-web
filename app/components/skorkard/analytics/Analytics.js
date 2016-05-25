import { just } from 'most'
import { div } from '@motorcycle/dom'
import styles from './styles.scss'

// VIEW

const render = () =>
  div(`.${styles.analyticsContainer}`)

// COMPONENT

const Analytics = () => {
  const state$ = just(true)
  const vtree$ = state$.map(render)
  
  return {
    DOM: vtree$
  }
}

export default Analytics