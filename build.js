var webpack             = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var UglifyJsPlugin      = webpack.optimize.UglifyJsPlugin;
var path                = require('path');
var DefinePlugin        = webpack.DefinePlugin;
var WebpackDevServer    = require("webpack-dev-server");
var NODE_ENV            = process.env.NODE_ENV || 'production';

var buildConfig = {
  entry                 : {
    main                : path.join(__dirname, '/src/index.js')
  },

  output                : {
    path                : path.join(__dirname, '/dist'),
    filename            : '[name].js',
    publicPath          : '/'
  },

  plugins               : [
    new HtmlWebpackPlugin({
      title             : '',
      template          : path.join(__dirname, '/src/index.html'),
      inject            : true
    }),
    
    new webpack.DefinePlugin({
      'process.env'     : {
        NODE_ENV        : JSON.stringify(NODE_ENV)
      }
    }),
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

if (NODE_ENV === 'development') {
  buildConfig['devtool'] = 'source-map';
} else if (NODE_ENV === 'production') {
  buildConfig.plugins.push(new UglifyJsPlugin({
    compress  : { warnings : false },
    sourcemap : false,
    mangle    : true
  }));
}

const compiler = webpack(buildConfig);

if (NODE_ENV === 'development') {
  const server = new WebpackDevServer(compiler, {
    contentBase : path.join(__dirname, 'dist'),
    noInfo: false,
    quiet: false,
    lazy: false,
    publicPath: '/',
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.listen(3000, 'localhost', function(){
    console.log('Webpack Dev Server is listening on port 3000');
  });
} else if (NODE_ENV === 'production') {
  compiler.run(function (err, stats) {
    if (err) throw err;

    console.log(stats.toString({
      colors : true,
      chunks : false
    }));
  });
}
