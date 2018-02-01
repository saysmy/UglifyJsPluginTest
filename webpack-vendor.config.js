// 引入操作路径模块和webpack 
var path = require('path');
var webpack = require('webpack');

//webpack配置
var postcssConfigDir = './webpack-config/postcss.config.js';
var resolveConfigDir = './webpack-config/resolve.config.js';


//触屏目录配置
var entryDir = './static/dist/**/*.js';

var dll_manifest_name = 'dll';
var vendor_manifest_name = 'vendor';

var entries;
entries = ['common'];

module.exports = {
    /* 输入文件 */
	resolve: require( resolveConfigDir ),
	entry: {
		vendor: entries
	},
	output: {
		path: path.resolve(__dirname, './static/dist'),
		filename: 'js/[name].js?v=[chunkhash:8]',
		library: '[name]_library',
		/*libraryTarget: 'umd'*/
	},
	module: {
		rules: [
			{
				test: /\.ejs$/,
				loader: 'ejs-loader'
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				include: path.resolve(__dirname, entryDir),
				options: {
					fix: true
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory=true',
        		exclude: ['node_modules']
			}
		]
	},
	plugins: [
	    
	]
};

console.log('success')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports.plugins = module.exports.plugins.concat([
	
	//压缩JS代码
	/*new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		//sourceMap: true,
		output: {
			comments: false, // 去掉注释内容
		}
	})*/
	new UglifyJsPlugin({
	    uglifyOptions: {
	      output: {
	        comments: false,
	        beautify: false,
	      },
	      compress: true,
	      warnings: false
	    }
	})
]);
