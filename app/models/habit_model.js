/*jshint esversion: 6 */
import { just } from 'most';

function HabitModel(data) {
	const updateHabit = newData => true;
	const habit$ = just(data);
	
	return {
		habit$,
		habitActions: {
			updateHabit
		}
	};
}

export default HabitModel;