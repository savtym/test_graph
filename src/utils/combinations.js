
const { union } = require('lodash');


module.exports = function getCombinations(l, n) {

	const getSquare = length =>
		Array.from({ length }, (_, i) =>
			Array.from({ length }, (_, j) => i !== j)
		);


	const result = [];
	const length = n === 1 ? 1 : l;

	for (let i = n - 1; i < length; i++) {
		const square = getSquare(l - i);

		const leftSide = Array.from({ length: l - i }, () =>
			Array
				.from({ length: i }, (_, index) => !(index < n - 1))
				.reverse()
		);

		result.push(
			leftSide.map((row, index) =>
				row.concat(square[index])
			)
		);
	}

	console.log(
		`combinations { blocks: ${l}, broken: ${n} }: `,
		result.reduce((p, n) => p + n.length, 0)
	);

	return union(...result);
};
