module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'backbone-presenter.js',
        library: "backbonePresenter",
        libraryTarget: "umd"
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