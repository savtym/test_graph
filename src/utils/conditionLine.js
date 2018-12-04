const { flatten } = require('lodash');
const { values, schema } = require('../data');

const isSingle = tide => tide.every(block => !Array.isArray(block));
const isProcessor = path => Array.isArray(path) &&
	path.some(block => values[block]);

const concat = (cur, arr) => {
	if (typeof(arr) === 'string') {
		return cur.length === 0
			? [[arr]]
			: cur.map(item => [...item, arr]);
	}

	if (isSingle(cur)) {
		return arr.map(item => [...cur, item]);
	}

	return arr.reduce((p, block) =>
			p.concat(cur.map(path => [...path, block]))
		, []);
};


function convert(tide, result = []) {
	if (Array.isArray(tide)) {
		if (isSingle(tide)) {
			return concat(result, tide);
		}

		for (let point of tide) {
			if (values[point] || isProcessor(point)) {
				result = concat(result, point)
					.map(path => path.some(block => Array.isArray(block))
						? flatten(path)
						: path
					);

				continue;
			}

			const block = convert(point, result);

			if (typeof(point) === 'string') {
				result = concat(result, block);
			} else {
				result = [...block];
			}
		}

		return result;
	} else if (tide) {
		return tide;
	}
}

module.exports = (lines, BCC) => {
	let result = [];
	const paths = lines.reduce((p, line) => {
		p.push(...convert(line));
		return p;
	}, []);


	for (let vector of BCC) {
		const unavailableBlocks = vector
			.filter(point => !point.isWork)
			.map(point => point.block);

		const availablePaths = paths.filter(path =>
			!unavailableBlocks.some(block => path.includes(block))
		);

		// TODO: when module is not work needing to separate powerful
		// result = result.concat(availablePaths);
	}

	return result;
};
