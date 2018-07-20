const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const { ReactLoadablePlugin } = require( 'react-loadable/webpack' ) ;

const rootPath = path.join( __dirname );

const devConfig = {
  context: path.join( rootPath, './src' ),
  entry: {
    client: './utils/renderer/csr.js',
    vendors: [ 'react', 'react-dom', 'react-loadable', 'react-router', 'react-router-dom' ]
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve( rootPath, './dist' ),
    publicPath: '/',
    chunkFilename: 'js/[name]-[hash:8].js',
    library: 'clientSideRender',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [ '.js', '.jsx', 'css', '.less', '.scss', '.png', '.jpg'],
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
            presets: [ 'env', 'es2015', 'react' ],
            plugins: [
              'babel-plugin-transform-object-rest-spread',
              'syntax-dynamic-import',
              'transform-runtime',
              'add-module-exports',
              'react-loadable/babel'
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve( rootPath, 'src/client/styles' ),
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
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
    new CopyWebpackPlugin( [ { from: './client/favicon.ico' } ] ),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin( { summary: false } ),
    new ExtractTextPlugin( { filename: 'cs/style.[hash:8].css', allChunks: true } ),
    new webpack.DefinePlugin( { 'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV|| 'development' ) } ),
    new webpack.optimize.CommonsChunkPlugin( { name: [ 'vendors', 'manifest' ], minChunk: 2 } ),
    new HtmlWebpackPlugin( { title: 'test1', filename: 'index.html', template: './client/template.ejs' } ),
    new ReactLoadablePlugin( { filename: path.join( rootPath, './dist/react-loadable.json' ) } ),
  ]
};

module.exports = devConfig;