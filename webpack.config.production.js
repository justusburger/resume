const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(PATHS) {
  let extractSASS = new ExtractTextPlugin('[name].css');
  return {
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