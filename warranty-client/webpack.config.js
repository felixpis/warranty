var path = require('path');

module.exports = {

  // set the context (optional)
  context: path.join( __dirname, '/src'),
  entry: 'app.js',

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src')
  },

  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel" },

      // load css and process less
      { test: /\.css$/, loader: "style!css"},

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    port: 2500,
    noInfo: false
  },

  // support source maps
  devtool: "#inline-source-map"
};