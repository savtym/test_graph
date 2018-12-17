const { schemes } = require('./data');

const logs = require('./utils/logs');
const calculation = require('./utils/calculation');

const after = [];
const before = calculation(schemes.before);
logs(before);

for (let { scheme, name } of schemes.after) {
	console.log(`\n\n${name}`);
	const result = calculation(scheme);

	after.push({ ...result, name });
	logs(result);
}

console.log('\nImprovements\n');

for (let { broken, counter, sum, name } of after) {
	console.log(`${name}\n`);
	console.log(`All cases before: ${before.counter}, after: ${counter}`);
	console.log(`All broken blocs before: ${before.broken}, after: ${broken}`);
	console.log(
		`Summary probability before: ${(1 - before.sum).toFixed(9)}, after: ${(1 - sum).toFixed(9)}\n`
	);
}