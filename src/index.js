
const {
	schema,
	blocks,
	probabilityOfFailure,
} = require('./data');

const combinations = require('./utils/combinations');
const conditionLine = require('./utils/conditionLine');


let paths = [];
let sum = 0;

const infoBlocks = blocks.reduce((p, block) => {
	p[block] = 0;
	return p;
}, {});


for (let i = 1; i <= 2; i++) {
	const BCCs = combinations(blocks.length, i)
		.map(vector =>
			vector.map((isWork, index) => ({
				isWork,
				block: blocks[index],
			}))
		);

	// get all
	paths = paths.concat(conditionLine(schema, BCCs, infoBlocks));

	let counter = 0;
	for (let vector of BCCs) {
		let probability = 1;

		for (let { isWork, block } of vector) {
			const q = probabilityOfFailure[block.slice(0, -1)];
			const p = 1 - q;
			probability *= Number(isWork) * p + (1 - Number(isWork)) * q;
			counter++
		}

		sum += probability;
	}

	console.log({counter, length: BCCs.length})
}

console.log('\nNot work', paths.filter(r => !r.isWork).length);

console.log(
	'\nCounter blocks because of which system is unavailable:\n',
	Object.keys(infoBlocks).map(k => `\t${k}: ${infoBlocks[k]}`).join('\n'),
);

console.log(
	'\nSum probability failure of all BCC: ',
	sum,
);





