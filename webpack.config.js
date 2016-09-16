// To build for release: NODE_ENV=production npm run build
const webpack = require('webpack');

const plugins = [];
const env     = process.env.NODE_ENV;

var suffix = '.js';

if (env === 'production') {
  suffix = '.min.js';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['HorizontalScroller', 'exports', 'require']
    }
  }));
}

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/docs',
    filename: 'horizontal-scroller' + suffix,
    library: 'horizontal-scroller',
    umdNamedDefine: false,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      // { test: /\.css$/, exclude: /\.useable\.css$/, loader: 'style!css' },
      // { test: /\.useable\.css$/, loader: 'style/useable!css' },
      { test: require.resolve("./scroller.js"), loader: "expose?HorizontalScroller" },
      { test: /\.less$/, loader: 'css!less' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: plugins
};
