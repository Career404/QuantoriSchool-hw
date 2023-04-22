const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'To Do app',
			scriptLoading: 'module',
			favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
		}),
	],
};
