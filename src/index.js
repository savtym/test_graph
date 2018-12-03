
const { schema, blocks } = require('./data');
const combinations = require('./utils/combinations');



for (let i = 1; i <= 2; i++) {
	const BCCs = combinations(blocks.length, i)
		.map(vector => 
			vector.map((value, index) => ({
				value,
				block: blocks[index],
			}))
		);

	for (let line of schema) {

	}

}



console.log(schema)
// function getCombinations(l, n) {
// 	const arrangement = Array
// 		.from({ length: n }, (_, i) => l - i)
// 		.reduce((p, n) => p * n, 1);

// 	const permutation = Array
// 		.from({ length: n }, (_, i) => i + 1)
// 		.reduce((p, n) => p * n, 1);

// 	return arrangement / permutation;
// }









