const hostname = 'localhost';
const port = 8000;

module.exports = {
  entry: 'mocha!./test/index.js',
  output: {
    filename: 'test.build.js',
    path: 'test/',
    publicPath: 'http://' + hostname + ':' + port + '/test'
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
      },
      // Sinon uses AMD style requires that conflict with Webpack, so we
      // tell Webpack to ignore them.
      { test: /sinon.js$/, loader: "imports?define=>false,require=>false" }
    ]
  },
  resolve: {
    alias: {
      // Require the compiled Sinon package rather than try to build it.
      sinon: 'sinon/pkg/sinon'
    }
  },
  devServer: {
    host: hostname,
    port: port
  }
};