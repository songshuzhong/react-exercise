const path = require( 'path' );
const webpack = require( 'webpack' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    vendor: [ 'react', 'react-dom', 'react-router', 'react-router-dom' ],
    app: [ './mobx/index.js', 'webpack-hot-middleware/client?reload=true' ]
  },
  output: {
    pathinfo: true,
    path: path.resolve( process.cwd(), 'src/public' ),
    publicPath: 'http://localhost:3000/',
    filename: 'js/[name].bundle.min.js',
    chunkFilename: 'js/[name].chunk.min.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            loader: require.resolve( 'babel-loader' ),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: () => [
                    require( 'postcss-flexbugs-fixes' ),
                    autoprefixer( {
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009'
                    } )
                  ]
                }
              }
            ]
          },
          {
            test: /\.less$/,
            exclude: [/node_modules/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:8]'
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: () => [
                    require( 'postcss-flexbugs-fixes' ),
                    autoprefixer( {
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009'
                    } )
                  ]
                }
              },
              {
                loader: require.resolve('less-loader'),
                options: { modifyVars: { '@primary-color': '#1DA57A' } }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: env ==='production' ? [
    new ExtractTextPlugin( { filename: `cs/[name].min.css` } ),
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      }
    } ),
    new webpack.optimize.CommonsChunkPlugin( {
      name: "vendor",
      minChunks: Infinity,
    } ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new BundleAnalyzerPlugin( {
      analyzerMode: 'static',
      reportFilename: 'app.bundle.report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      logLevel: 'info'
    } )
  ]:
    [
      new ExtractTextPlugin( { filename: `cs/[name].min.css` } ),
      new webpack.optimize.CommonsChunkPlugin( {
        name: "vendor",
        minChunks: Infinity,
      } ),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};