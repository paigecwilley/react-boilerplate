var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	//Entry tell you to run on localhost:8080 as a hot reloader using the main.js file (where you bundle from)
	entry:  {
		app: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
			'./js/main.js'
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
		//gets name from app
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new HtmlWebpackPlugin({
			//where to find the index file
			title: 'React in ES6',
			template: './index.html'
		})
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test:/\.html$/,
				loader: 'html'
			}
		]
	},
	//Runs persistently while you're deving - like nodemon but for frontend
	devServer: {
		contentBase: './dist',
		headers: {"Access-Control-Allow-Origin": "*"},
		port: 8080,
		hot: true,
		historyApiFallback: true
	}
}