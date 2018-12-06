
const blocks = [
	'D2',
	'D3',
	'D4',
	'D5',
	'D7',
	'D8',
	'C1',
	'C2',
	'C3',
	'C5',
	'C6',
	'B1',
	'B2',
	'B4',
	'A1',
	'A3',
	'M2',
	'Pr1',
	'Pr2',
	'Pr3',
	'Pr4',
	'Pr5',
];

const schema = [
	['D2', ['C1', 'C2'], ['B1', 'B2'], ['Pr1', 'Pr2', 'Pr3', ['A1', 'M2', 'A3', 'B4', 'Pr5']]],
	['D3', 'C2', ['B1', 'B2'], ['Pr1', 'Pr2', 'Pr3']],
	['D4', 'C3', 'B2', ['Pr2', 'Pr3', ['A1', 'M2', 'A3', 'B4', 'Pr4']]],
	['D5', 'D7', 'D8', 'C5', 'B4', ['Pr4', 'Pr5']]
];

const probabilityOfFailure = {
	Pr: 2.2 * Math.pow(10, -4),
	A: 2.2 * Math.pow(10, -4),
	B: 1.1 * Math.pow(10, -5),
	C: 2.1 * Math.pow(10, -4),
	D: 4.4 * Math.pow(10, -5),
	M: 5.3 * Math.pow(10, -4),
};

const values = {
	Pr1: {
		nominal: 50,
		max: 90,
		redistribution: {
			Pr2: 10,
			Pr3: 40,
			Pr4: 40,
			Pr5: 30,
		},
	},
	Pr2: {
		nominal: 30,
		max: 80,
		redistribution: {
			Pr1: 20,
			Pr3: 30,
		},
	},
	Pr3: {
		nominal: 50,
		max: 120,
		redistribution: {
			Pr1: 20,
			Pr2: 40,
			Pr4: 50,
			Pr5: 20,
		},
	},
	Pr4: {
		nominal: 70,
		max: 100,
		redistribution: {
			Pr2: 60,
			Pr3: 10,
			Pr5: 30,
		},
	},
	Pr5: {
		nominal: 20,
		max: 40,
		redistribution: {
			Pr1: 10,
			Pr3: 20,
			Pr4: 20,
		},
	},
};

module.exports = {
	schema,
	values,
	blocks,
	probabilityOfFailure,
};
