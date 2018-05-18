
const path = require('path');

const SRC_DIR = path.normalize(__dirname + '/../src');
const DIST_DIR = path.normalize(__dirname + '/../dist');

const CONFIG = {
	mode: 'development',
	entry: {
		'uchain': [ './src/index.js' ],
	},
	output: {
		path: DIST_DIR,
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015' ],
				},
			},
		],
	},
	resolve: {
		extensions: [ '.js' ],
		modules: [ SRC_DIR, 'node_modules' ],
	},
	stats: {
		colors: true,
	},
};


module.exports = CONFIG;
