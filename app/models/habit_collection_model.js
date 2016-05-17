/*jshint esversion: 6 */
import { sortBy, prop, keys, reduce, values, merge, sum, curry, evolve } from 'ramda';
import { createModel } from './../helpers/model';
import data from './../data';

// HELPERS

const processHabits = habits => {
	const sortByOrder = sortBy(prop('order'));
	const habitArray = sortByOrder(keys(habits).map(id => habits[id]));
	const positive = habitArray.filter(habit => habit.score > 0).map(HabitModel);
	const negative = habitArray.filter(habit => habit.score < 0).map(HabitModel);
	
	return { positive, negative };
};

const nextHabitKey = habits => reduce(max, -Infinity, keys(habits).map(Number)) + 1;

const nextHabitOrder = habits => reduce(
	min, Infinity, values(map(prop('order'), habits))) - 1;
	
	
// MODIFICATIONS

const updateHabit = (habits, habitId, transform) =>
	merge(habits, evolve(transform, habits[habitId]));

const habitMods = {
	ADD_HABIT: (habits, { newHabit }) => merge(habits, { 
		[nextHabitKey(habits)]: merge(newHabit, { order: nextHabitOrder(habits) }) 
	}),
	ARCHIVE_HABIT: (habits, { habitId }) => 
		updateHabit(habits, habitId, { active: _ => false }),
	ACTIVATE_HABIT: (habits, { habitId }) => 
		updateHabit(habits, habitId, { active: _ => true }),
	UPDATE_HABIT: (habits, { habitId, transform }) => 
		updateHabit(habits, habitId, transform)
};
	
	
// MODEL

const HabitCollectionModel = () => {
	const [habitDictionary$, habitDispatch] = createModel(habitMods, data.habits);
	const habitList$ = habitDictionary$.map(processHabits);
	
	return { habitDictionary$, habitList$, habitDispatch };
};

export default HabitCollectionModel;