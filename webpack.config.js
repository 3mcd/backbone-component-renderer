module.exports = {
	entry: __dirname + '/src/api.js',
	output: {
		path: __dirname + '/dist',
		filename: 'backbone-component-renderer.js',
      library: 'backboneComponentRenderer',
      libraryTarget: 'umd'
	},
	module: {
		loaders: [
	    {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['stage-0', 'es2015']
				}
	    }
		]
	}
};