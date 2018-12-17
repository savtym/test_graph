
const logs = ({ broken, counter, sum, infoBlocks }) => {
	console.log(
		`\nScheme wasn't work for all cases: ${broken} times from ${counter}`,
	);

	console.log(`Summary probability of all BCC: ${(1 - sum).toFixed(9)}`);

	console.log(
		'\nQuantity blocks because of which system is unavailable:\n',
		Object.keys(infoBlocks).map(k => `\t${k}: ${infoBlocks[k]}`).join('\n'),
	);
};

module.exports = logs;
