/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

const config = {
	mode: 'production',
	entry: './build/index.js',
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'build', 'webpack'),
		chunkFormat: 'commonjs',
		filename: 'main.js'
	},
	plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
	experiments: {
		topLevelAwait: true
	}
};

module.exports = config;
