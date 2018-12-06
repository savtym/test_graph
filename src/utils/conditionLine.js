const { flatten, cloneDeep, omit } = require('lodash');
const { values } = require('../data');
const { getUnavailableBlocks } = require('./common');

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


function isRedistributionValue(prs, { nominal, redistribution }) {
	for (let pr in redistribution) {
		const cur = prs[pr];

		if (redistribution[pr] <= cur.max - cur.nominal) {
			nominal -= redistribution[pr];
			prs[pr].nominal += redistribution[pr];
		}

		if (nominal <= 0) {
			return true;
		}
	}

	return false;
}


module.exports = (lines, BCC, infoBlocks) => {
	let result = [];
	const paths = lines.reduce((p, line) => {
		p.push(convert(line));
		return p;
	}, []);

	for (let vector of BCC) {
		const Prs = cloneDeep(values);

		const unavailableBlocks = getUnavailableBlocks(vector);

		const availablePaths = paths.map(line =>
			line.filter(path =>
				!unavailableBlocks.some(block => path.includes(block))
			)
		);

		const unavailablePrs = unavailableBlocks.filter(block => Prs[block]);

		const isWorkPrs = unavailablePrs.every(pr =>
			isRedistributionValue(Prs, {
				nominal: Prs[pr].nominal,
				redistribution: omit(Prs[pr].redistribution, unavailablePrs),
			})
		);

		const isWork = isWorkPrs && availablePaths.every(path => path.length !== 0);

		if (!isWork) {
			unavailableBlocks.forEach(block => {
				infoBlocks[block] += 1;
			});
		}

		result.push({
			isWork,
			unavailableBlocks,
		});
	}

	return result;
};
