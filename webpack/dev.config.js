/*jshint esversion: 6 */
import webpack from 'webpack';
import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const HOST = 'localhost';
const PORT = 3001;
const PUBLIC_PATH = `//${HOST}:${PORT}/assets/`;
const HOT_ENTRY = `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`;

const config = {
	server: {
		port: PORT,
		options: {
			publicPath: PUBLIC_PATH,
			hot: true,
			stats: {
				assets: true,
				colors: true,
				version: false,
				hash: false,
				timings: true,
				chunks: false,
				chunkModules: false
			}
		}
	},
	webpack: {
		devtool: 'cheap-module-source-map',
		entry: {
			homepage: [
				HOT_ENTRY, 
				'font-awesome-webpack!./webpack/font-awesome.config.js',
				'./app/javascripts/homepage.js'
			],
			skorkard: [
				HOT_ENTRY, 
				'font-awesome-webpack!./webpack/font-awesome.config.js', 
				'./app/javascripts/skorkard.js'
			]
		},
		output: {
			path: path.resolve(__dirname, '../public'),
			filename: '[name].js',
			chunkFilename: '[name].js',
			publicPath: PUBLIC_PATH
		},
		module: {
			loaders: [
				{ 
					test: /\.js$/, 
					exclude: /node_modules/, 
					loaders: ['babel', 'webpack-module-hot-accept']
				},
				{
					test:   /\.scss$/,
					loader: "style!css?modules&importLoaders=1!postcss!sass",
					exclude: /node_modules/
				},
				{ 
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader: "url-loader?limit=10000&mimetype=application/font-woff" 
				},
				{ 
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader: "file-loader" 
				}
			]
		},
		postcss: function (webpack) {
				return [precss, autoprefixer];
		},
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin()
		],
		resolve: {
			extensions: ['', '.js']
		}
	}
};

export default config;