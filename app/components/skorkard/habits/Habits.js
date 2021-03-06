import { curry } from 'ramda'
import { div, ul } from '@motorcycle/dom'
import styles from './styles.scss'

import Habit from './habit/Habit'
import HabitForm from './habit_form/HabitForm'

// VIEW

const renderHabits = (DOM, habitList, type) =>
  habitList.map(habit => Habit(DOM, habit, type).DOM)

const render = (DOM, habitLists, positiveHabitsFormVtree, 
  negativeHabitsFormVtree) => (
  div(`.${styles.habitsContainer}`, [
    div(`.${styles.positiveHabitsColumn}`, [
      positiveHabitsFormVtree,
      ul(`.${styles.positiveHabits}`, 
        renderHabits(DOM, habitLists.positive, 'positive'))
    ]),
    div(`.${styles.negativeHabitsColumn}`, [
      negativeHabitsFormVtree,
      ul(`.${styles.negativeHabits}`, 
        renderHabits(DOM, habitLists.negative, 'negative'))
    ])
  ])
)

const view = (habitLists$, DOM, positiveHabitsForm, 
  negativeHabitsForm) => {
  const renderWithDOM = curry(render)(DOM)
  
  return habitLists$
    .combine(renderWithDOM, positiveHabitsForm.DOM, negativeHabitsForm.DOM)
}

// COMPONENT

const Habits = ({ DOM, habitCollectionModel }) => {
  const { habitLists$, habitDispatch } = habitCollectionModel
  const positiveHabitsForm = HabitForm(DOM, habitDispatch, 'positive')
  const negativeHabitsForm = HabitForm(DOM, habitDispatch, 'negative')
  
  return {
    DOM: view(habitLists$, DOM, positiveHabitsForm, negativeHabitsForm)
  }
} 

export default Habits