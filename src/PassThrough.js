
const { nop, noarr } = require('./_base');

const PassThrough = (next, ...args) => (next || nop)(null, ...(args || noarr));

module.exports = PassThrough;
