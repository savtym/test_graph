
module.exports = (broken, n) => {

	const result = [];
	const length = Math.pow(2, n);

	for (let i = 1; i < length; i++) {
		const buf = (i).toString(2).padStart(n, '0');
		const found = buf.match(/([^1])/g);

		// when block is broken
		if (found && found.length === broken) {
			result.push(
				[...buf].map(block => block === '1'),
			);
		}
	}

	console.log(
		`Combinations : ${result.length}`,
	);

	return result;
};
