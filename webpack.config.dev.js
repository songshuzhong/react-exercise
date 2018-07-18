const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const rootPath = path.join( __dirname );

const devConfig = {
  context: path.join( rootPath, './src' ),
  entry: {
    client: './client/index.js',
    vendors: [ 'react', 'react-dom', 'react-loadable', 'react-router', 'react-router-dom' ]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve( rootPath, './dist/client' ),
    publicPath: '/',
    chunkFilename: '[name]-[hash:8].js'
  },
  resolve: {
    extensions: [ 'js', 'jsx', 'css', 'less', 'scss', 'png', 'jpg'],
    modules: [ path.resolve( rootPath, 'src' ), 'node_modules' ]
  },
  devServer: {
    contentBase: 'assets',
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve( rootPath, 'src' ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env', 'react', 'stage-0' ],
            plugins: [ 'transform-runtime', 'add-module-exports' ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: path.resolve( rootPath, 'src' ),
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [ require( 'autoprefixer' )( { browsers: 'last 5 versions' } ) ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        } )
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin( [ { from: 'favicon.ico' } ] ),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin( { summary: false } ),
    new ExtractTextPlugin( { filename: 'style.[hash].css' } ),
    new webpack.DefinePlugin( { 'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV|| 'development' ) } ),
    new webpack.optimize.CommonChunkPlugin( { name: [ 'vendors', 'manifest' ], minChunk: 2 } ),
    new HtmlWebpackPlugin( { title: 'test1', filename: 'index.html', template: './template.ejs' } )
  ]
};