/*jshint esversion: 6 */
import createSubject from './../helpers/subject';
import { just } from 'most';
import { sortBy, prop, keys, reduce, values, merge, sum, curry, evolve } from 'ramda';
import HabitModel from './habit_model';
import data from './../data';

function processHabits(habits) {
	const sortByOrder = sortBy(prop('order'));
	const habitArray = sortByOrder(keys(habits).map(id => habits[id]));
	const positive = habitArray.filter(habit => habit.score > 0).map(HabitModel);
	const negative = habitArray.filter(habit => habit.score < 0).map(HabitModel);
	
	return { positive, negative };
}

function createHabitCollection(habitDictionary$) {	
	return habitDictionary$.map(processHabits);
}

const nextHabitKey = habits => reduce(max, -Infinity, keys(habits).map(Number)) + 1;
const nextHabitOrder = habits => reduce(
	min, Infinity, values(map(prop('order'), habits))) - 1;

function createHabitDictionary(newHabits$) {
	const dict$ =  newHabits$.scan(
		(habits, newHabit) => 
			merge(habits, { 
				[nextHabitKey(habits)]: merge(newHabit, { order: nextHabitOrder(habits) }) 
			}), data.habits);
	// dict$.observe(console.log.bind(console))
	return dict$;
}

function createHistory() {
	return just(data.history);
}

function createScores(history$, habitDictionary$) {
	return history$.combine(calculateScores, habitDictionary$);
}

function calculateScores(history, habitDictionary) {
	return map(counts => 
		sum(keys(counts).map(habitId => 
			counts[habitId] * habitDictionary[habitId].score)), history);
}

const habitMods = {
	ADD_HABIT: (habits, newHabit) => merge(habits, { 
		[nextHabitKey(habits)]: merge(newHabit, { order: nextHabitOrder(habits) }) 
	}),
	ARCHIVE_HABIT: (habits, habitId) => 
		updateHabit(habits, habitId, { active: _ => false }),
	ACTIVATE_HABIT: (habits, habitId) => 
		updateHabit(habits, habitId, { active: _ => true }),
	UPDATE_HABIT: updateHabit
};

const updateHabit = (habits, habitId, transform) =>
	merge(habits, evolve(transform, habits[habitId]));

const historyMods = {
	ADD_OCCURRENCE:,
	REMOVE_OCCURENCE:
};

const modify = (mods, { model, action, data }) => mods[action](data);
const curriedModify = curry(modify);
const modifyHabits = curriedModify(habitMods);
const modifyHistory = curriedModify(historyMods);

function HabitCollectionModel() {
	const [newHabits$, newHabitObserver] = createSubject();
	const addHabit = habitData => newHabitObserver.next(habitData);
	const archiveHabit = id => true;
	const activateHabit = id => true;
	
	const habitDictionary$ = createHabitDictionary(newHabits$);
	const history$ = createHistory();
	const scores$ = createScores(history$, habitDictionary$);
	const habitCollection$ = createHabitCollection(habitDictionary$);
	
	return {
		habitCollection$,
		habitCollectionActions: {
			addHabit,
			archiveHabit,
			activateHabit
		}
	};
}

export default HabitCollectionModel;