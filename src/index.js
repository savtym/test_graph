
const {
	schema,
	blocks,
	probabilityOfFailure,
} = require('./data');

const { uniq } = require('lodash');

const combinations = require('./utils/combinations');
const conditionLine = require('./utils/conditionLine');


let sum = 0;
let broken = 0;
let counter = 0;

const multiplicity = {
	3: 0.5,
	4: 0.1,
};

const infoBlocks = blocks.reduce((p, block) => {
	p[block] = 0;
	return p;
}, {});


const getProbability = vector => {
	let probability = 1;

	for (let { isWork, block } of vector) {
		const q = probabilityOfFailure[block.slice(0, -1)];
		const p = 1 - q;
		probability *= Number(isWork) * p + (1 - Number(isWork)) * q;
	}

	return probability;
};


for (let i = 1; i <= 4; i++) {
	console.log(
		`\nStart calculation { blocks: ${blocks.length}, broken: ${i} }`,
	);

	const BCCs = combinations(i, blocks.length)
		.map(vector =>
			vector.map((isWork, index) => ({
				isWork,
				block: blocks[index],
			}))
		);

	// get all combinations with blocks from schema
	const localPaths = conditionLine(schema, BCCs, infoBlocks);
	let localBroken = localPaths.filter(r => !r.isWork).length;
	let localPathsLength = localPaths.length;

	let localSum = 0;

	if (multiplicity[i]) {
		const { length } = BCCs;
		const percent = multiplicity[i];
		localBroken = parseInt(localBroken * percent);
		localPathsLength = parseInt(localPathsLength * percent);

		for (let i = 0; i < length; i += parseInt(percent * length)) {
			if (!localPaths[i].isWork) {
				localSum += getProbability(BCCs[i]);
			}
		}

		localSum /= percent;
	} else {
		// get probability scheme with broken elements
		for (let i = 0; i < BCCs.length; i++) {
			if (!localPaths[i].isWork) {
				localSum += getProbability(BCCs[i]);
			}
		}
	}

	console.log(
		`Scheme wasn't work ${localBroken} times from ${localPathsLength}`,
	);

	broken += localBroken;
	counter += localPathsLength;

	sum += localSum;
	console.log(
		`Probability of scheme crash: ${localSum}`,
	);
}

console.log(
	`\nScheme wasn't work for all cases: ${broken} times from ${counter}`,
);

console.log(
	'Summary probability failure of all BCC: ',
	sum,
);

console.log(
	'\nQuantity blocks because of which system is unavailable:\n',
	Object.keys(infoBlocks).map(k => `\t${k}: ${infoBlocks[k]}`).join('\n'),
);
