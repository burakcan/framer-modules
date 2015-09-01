var webpack             = require('webpack');
var path                = require('path');
var DefinePlugin        = webpack.DefinePlugin;
var NODE_ENV            = process.env.NODE_ENV || 'production';
var fs                  = require('fs');

/*
 * Build Server App
 */

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var serverConfig = {
  entry                 : {
    server              : path.join(__dirname, '/src/server/index.js')
  },

  output                : {
    path                : path.join(__dirname, '/dist'),
    filename            : '[name].js',
    publicPath          : '/'
  },

  target                : 'node',

  node                  : {
    global              : false,
    process             : false,
    Buffer              : false,
    __filename          : true,
    __dirname           : true
  },

  externals             : nodeModules,

  plugins               : [
    new webpack.IgnorePlugin(/\.(css|sass|scss)$/)
  ],

  resolve               : {
    extensions          : ['', '.js', '.sass', '.scss', '.svg'],
    alias               : {
      'root'            : path.join(__dirname, '/src'),
      'actions'         : path.join(__dirname, '/src/actions'),
      'components'      : path.join(__dirname, '/src/components'),
      'containers'      : path.join(__dirname, '/src/containers'),
      'middleware'      : path.join(__dirname, '/src/middleware'),
      'reducers'        : path.join(__dirname, '/src/reducers'),
      'store'           : path.join(__dirname, '/src/store'),
      'styles'          :path.join(__dirname, '/src/styles')
    }
  },

  module                : {
    loaders             : [
      { test            : /\.js$/,
        loaders         : ['babel-loader'],
        include         : path.join(__dirname, '/src')
      }, {
        test            : /\.scss$/,
        loaders         : ['style', 'css', 'sass']
      }, {
        test            : /\.svg$/,
        loaders         : ['file']
      }
    ]
  }
}

const compiler = webpack(serverConfig);

compiler.run(function (err, stats) {
  if (err) throw err;

  console.log(stats.toString({
    colors : true,
    chunks : false
  }));
});
