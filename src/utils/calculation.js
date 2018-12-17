
const { uniq, flattenDeep } = require('lodash');

const combinations = require('./combinations');
const conditionLine = require('./conditionLine');
const { probabilityOfFailure } = require('../data');

const multiplicity = {
	3: 0.5,
	4: 0.1,
};

const getInfoBlocks = blocks => blocks.reduce((p, block) => {
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

const calculation = scheme => {
	let sum = 0;
	let broken = 0;
	let counter = 0;

	const blocks = uniq(flattenDeep(scheme));
	const infoBlocks = getInfoBlocks(blocks);

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
		const localPaths = conditionLine(scheme, BCCs);

		let localSum = 0;
		let localBroken = 0;

		let step = 1;
		let length = localPaths.length;

		if (multiplicity[i]) {
			length = parseInt(multiplicity[i] * localPaths.length);
			step = parseInt(localPaths.length / length)
		}

		for (let i = 0; i < localPaths.length; i += step) {
			if (!localPaths[i].isWork) {
				localSum += getProbability(BCCs[i]);
				localBroken += 1;

				localPaths[i].unavailableBlocks.forEach(block => {
					infoBlocks[block] += 1;
				});
			}
		}

		console.log(
			`Scheme wasn't work ${localBroken} times from ${length}`,
		);

		console.log(
			`Probability of scheme not working: ${localSum.toFixed(9)}`,
		);

		broken += localBroken;
		counter += localPaths.length;
		sum += localSum / (multiplicity[i] || 1);
	}

	return {
		sum,
		broken,
		counter,
		infoBlocks,
	}
};


module.exports = calculation;