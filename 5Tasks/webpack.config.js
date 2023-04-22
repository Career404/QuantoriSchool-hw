const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'To Do app',
			favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							import: true,
						},
					},
				],
			},
		],
	},
};
