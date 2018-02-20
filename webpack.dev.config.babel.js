const path = require('path');
const webpack = require('webpack');

/* We're using jquery.dotdotdot version 1.6.14. which does not exist on the package registry
 * The one exist on the registry is 1.8.2, it is a re-build version of 1.6.14 and does not contain 
 * some features we're using.
 * */

module.exports = {
	entry: {
		App: ['./src/App.js']
	},
	devtool: 'source-map',
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	output: {
		path: path.resolve(__dirname, 'public/js/'),
		publicPath: '/js/',
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'window',
		libraryExport: "default",
		chunkFilename: '[name].chunk.js',
	},
	externals: {
		jquery: 'jQuery'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env', "react"],
							plugins: [
								"transform-class-properties",
								"transform-es2015-parameters",
								"transform-object-rest-spread",
								"syntax-flow",
								'babel-plugin-syntax-dynamic-import'
							]
						}
					},
					{
						loader: 'ts-loader',
						options: {
							onlyCompileBundledFiles: true,
							compilerOptions: {
								jsx: 'Preserve'
							}
						}
					}]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'flow'],
						plugins: [
							"transform-object-assign",
							"transform-class-properties",
							"transform-es2015-parameters",
							"transform-object-rest-spread",
							"syntax-flow",
							'babel-plugin-syntax-dynamic-import'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: ['css-loader']
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: '../../images/'
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							fallback: 'file-loader'
						}
					}
				]
			},
			{
				test: /\.(txt|html)$/,
				use: 'raw-loader'
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'react-svg-inline-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
};
