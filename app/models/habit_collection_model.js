/*jshint esversion: 6 */

function HabitCollectionModel() {
	
	return {
		activePositiveHabits$,
		activeNegativeHabits$,
		archivedPositiveHabits$,
		archivedNegativeHabits$,
		habitCollectionActions: {
			addHabit,
			archiveHabit,
			activateHabit
		}
	};
}