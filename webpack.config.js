const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    library: {
      amd: "vue-term",
      commonjs: "vue-term",
    }
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /(\.js|\.vue)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
        cache: false
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'vue-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }],
  },
}

const dev = {
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  devtool: 'inline-source-map',
}

const prod = {
  output: {
    filename: '[name].min.js',
    chunkFilename: '[chunkhash].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}

const web = {
  target: "web",
  entry: {
    'vue-term.web': "./src/web.js"
  }
}

const node = {
  target: "node",
  entry: {
    'vue-term': "./src/index.js"
  },
  externals: ["xterm"]
}

module.exports = _.flattenDeep([web, node].map(target => [prod, dev].map(env => merge(common, target, env))))
