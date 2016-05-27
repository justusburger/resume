const webpack = require('webpack');

module.exports = function(PATHS) {
  return {
    entry: {
      index: PATHS.index
    },
    output: {
      publicPath: '/'
    },
    module: {
      loaders: [
        {test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'], include: PATHS.src}
      ]
    },
    devServer: {
      contentBase: PATHS.public,
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: '0.0.0.0',
      port: '3000'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}