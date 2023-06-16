const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');

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
				use: [
					MiniCssExtractPlugin.loader, 
					'css-loader'
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico|mp4|m4a|woff2)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(glb|gltf|bin|manifest|obj|mtl)$/i,
				type: 'asset/resource',
				generator: {
					filename: c => {
						return c.filename.replace('src/', '')
					}
				}
			}
		],
	},
	devServer: {
		compress: true,
		port: 3000,
		server: 'https',
		open: false
	},
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                keep_classnames: true
            }
        })]
    }
}
