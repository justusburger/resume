const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(PATHS) {
  let extractSASS = new ExtractTextPlugin('[name].css');
  return {
    output: {
      publicPath: '/resume/'
    },
    module: {
      loaders: [
        { test: /\.scss$/, loader: extractSASS.extract(['css', 'postcss', 'sass']), include: PATHS.src }
      ]
    },
    plugins: [
      extractSASS
    ]
  };
};