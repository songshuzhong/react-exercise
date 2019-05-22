/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const prodMode = process.env.NODE_ENV === 'production';

let entry = {};
let htmlPlugins = [];
entry['basedep'] = ['react', 'mobx', 'mobx-react', '@babel/polyfill'];

glob.sync('./src/page/*/index.tsx').forEach(entries => {
    let pathname = entries.split('/').splice(-2).join('/').split('.')[0];
    entry[pathname] = ['@babel/polyfill', entries];
});

Object.keys(entry).forEach(page => {
    page = page.replace('/index', '');
    if (page === 'basedep') {
        return;
    }

    // 读取页面配置
    let pageConfig = {};
    if (fs.existsSync(`./src/page/${page}/index.json`)) {
        let fileContent = fs.readFileSync(`./src/page/${page}/index.json`, 'utf-8');
        pageConfig = JSON.parse(fileContent);
    }
    let loadingTips = `<style>.skeleton {width: 100vw;line-height:100vh;text-align:center;font-size: 20px;}</style>
        <div class="skeleton">正在加载中...</div>`;

    let config = {
        templateParameters: {
            head: pageConfig.head || '',
            title: pageConfig.title || '',
            skeletonStyle: pageConfig.skeletonStyle || loadingTips,
            scripts: pageConfig.scripts || [],
            debug: !prodMode
                ? `
                    <script src="//cdn.bootcss.com/eruda/1.1.3/eruda.min.js"></script>
                    <script>eruda.init();window.isDebug=true;</script>
                `
                : ''
        },
        filename: `page/${page}.html`,
        template: './src/template.ejs',
        compile: false,
        showErrors: true,
        cache: true
    };
    page = page + '/index';
    if (page in entry) {
        config.chunks = ['basedep', page];
        config.hash = false;
    }

    htmlPlugins.push(new HtmlWebpackPlugin(config));
});

let config = {
    mode: prodMode ? 'production' : 'development',
    bail: prodMode,
    target: 'web',
    context: __dirname,
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'output'),
        publicPath: prodMode ? '/' : '/',
        filename: 'js/[name].[hash:6].js',
        chunkFilename: 'js/chunks/[name].[hash:6].chunk.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'output'),
        compress: true,
        port: 3000,
    },
    externals: ['React', 'lodash'],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less']
    },
    module: {
        strictExportPresence: false,
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            configFile: false,
                            presets: [
                                ['@babel/env', {
                                    modules: 'commonjs'
                                }],
                                '@babel/react'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-syntax-dynamic-import'
                            ],
                            cacheDirectory: true,
                            cacheCompression: prodMode,
                            compact: prodMode
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    browsers: [
                                        '> 1%',
                                        'last 2 versions',
                                        'Firefox ESR',
                                        'Opera 12.1',
                                        'not ie <= 8',
                                        'Android >= 4.0',
                                        'iOS 7'
                                    ]
                                }),
                                require('postcss-plugin-px2rem')({
                                    rootValue: {
                                        px: 124.2,
                                        rpx: 248.4
                                    },
                                    unitPrecision: 3
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name(file) {
                                const path = file.substring(file.indexOf('/src') + 17, file.lastIndexOf('/')); // eslint-disable-line
                                return '/img' + path + '[hash:6].[ext]';
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            }
                        }
                    }
                ]
            }
            // {
            //     loader: 'file-loader',
            //     // Exclude `js` files to keep "css" loader working as it injects
            //     // its runtime that would otherwise be processed through "file" loader.
            //     // Also exclude `html` and `json` extensions so they get processed
            //     // by webpacks internal loaders.
            //     exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            //     options: {
            //         // name: 'static/media/[name].[hash:8].[ext]',
            //         name: `static/${moduleName}/media/[name].[hash:8].[ext]`
            //     },
            // }
        ]
    },
    optimization: {
        occurrenceOrder: true,
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true // eslint-disable-line
                    }
                },
                parallel: true,
                cache: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                // assetNameRegExp: /\.css\.*(?!.*map)/g,
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['output']),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash:6].css',
            chunkFilename: 'style/[name].[contenthash:6].css'
        })
    ],
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty' // eslint-disable-line
    }
};

config.plugins = config.plugins.concat(htmlPlugins);

if (prodMode) {
    config.plugins = config.plugins.concat(
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'static',
                reportFilename: 'app.report.html',
                defaultSizes: 'parsed',
                openAnalyzer: false,
                logLevel: 'info'
            }
        )
    );
}

module.exports = config;
