var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/imageLazy.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'imageLazy.js',
    library: 'Enjoy',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015'],
            "plugins": [
              "add-module-exports"
            ]            
        }
      }
    ]
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })*/
  ],
  resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
  }
}