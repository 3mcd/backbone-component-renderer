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
    noParse: [
      /sinon/
    ],
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
  },
  devServer: {
    host: hostname,
    port: port
  }
};