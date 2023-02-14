const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js'
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Babylon ECS'
		}),
		new MiniCssExtractPlugin()
	],
	experiments: {
		topLevelAwait: true
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(fx|glb|gltf|bin|png)$/i,
				loader: 'file-loader',
				options: {
					context: 'src',
					name: '[path][name].[ext]',
				},
			},
		],
	},
	devServer: {
		compress: true,
		port: 3000,
		server: 'https',
		open: false
	}
}
