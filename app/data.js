/*jshint esversion: 6 */

const data = {
	habits: {
		1: {
			name: 'Floss',
			score: 1
		},
		2: {
			name: 'Exercise',
			score: 2
		},
		3: {
			name: 'Eat junk food',
			score: -1
		},
		4: {
			name: 'Watch television',
			score: -1
		},
		5: {
			name: 'Meditate',
			score: 1
		},
		6: {
			name: 'Read',
			score: 1
		}
	},
	activeHabits: [1, 2, 3, 4, 5],
	archivedHabits: [6],
	history: {
		'2016-04-30': {
			1: 1,
			2: 1,
			3: 1,
			4: 1,
			5: 2
		}
	}
};

export default data;