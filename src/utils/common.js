
const getUnavailableBlocks = vector => vector
	.filter(point => !point.isWork)
	.map(point => point.block);


module.exports = {
	getUnavailableBlocks,
};