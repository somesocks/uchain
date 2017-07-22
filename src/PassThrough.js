
const { nop } = require('./_base');

const PassThrough = (next, ...args) => (next || nop)(null, ...args);

module.exports = PassThrough;
