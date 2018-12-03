
const { values, schema } = require('../data');


let arr = [];
function getValue(tide, result = []) {

	if (typeof(tide) === 'string') {
		result.push(tide);
	} else if (Array.isArray(tide)) {
		const newData = [];

		for (let point of tide) {
			if (Array.isArray(point)) {
				newData.push(convert(point, []));
			} else {
				newData.push(tide);
			}
		}

		for (let point of result) {

		}

	}

}



function l(line) {

	function convert(tide, result = []) {
		if (Array.isArray(tide)) {
			const buf = [];

			for (let point of tide) {
				buf.push(convert(point));
			}

			for (let point of buf) {
				result.push(point);
			}

			console.log({result})
			return buf;

		} else if (tide) {
			return tide;
		}
	}


	for (let block of line) {

	}
}

function convert(tide, result = []) {
	if (Array.isArray(tide)) {
		const buf = [];

		for (let point of tide) {
			const block = convert(point, result);

			if (typeof(block) === 'string') {
				result.push(block);
			} else {
				buf.push(block);
			}
		}

		const k = [];

		for (let point of buf) {
			result.push([ ...result, point]);
		}

		console.log({k, result})
		return result;

	} else if (tide) {
		return tide;
	}
}

console.log('schema', schema[0])
convert(schema[0]);


function f(line) {
	let result = [];

	for (let tide of line) {
		if (Array.isArray(tide)) {
			convert(result, tide);
		} else {
			result.push(tide);
		}
	}

}


module.exports = (line) => {
	const result = [];

	for (let tide of line) {

		if (Array.isArray(tide)) {
			const k = [];

			for (let point of tide) {
				k.push(convert(point, [...result]));
			}

			console.log({ k })
		} else if (tide) {
			result.push(tide);
			console.log('tide: ', tide, result)
		}

	}
};
