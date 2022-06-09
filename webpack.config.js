const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './script/main.js',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: isProd
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './style/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist') }
            ]
        })
    ],
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            { 
                test: /\.css$/i, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        }
                    },
                    'css-loader'
                ]
            },
            { test: /\.html/, use: 'html-loader' },
            { 
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/, 
                type: 'asset/resource',
            },
            {
                test: /\.(js)$/, 
                exclude: '/node_modules/',
                generator: {
                  filename: 'script/[name][ext]'
                },
                use: ['babel-loader']
            },
            {
                test: /\.(?:|woff|woff2)$/, 
                type: 'asset/resource',
                generator: {
                  filename: 'fonts/[name][ext]'
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `./js/${filename('js')}`,
        publicPath: '',
        assetModuleFilename: `img/${ isDev ? `[name][ext]` : `[name].[contenthash][ext]` }`
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000
    }
}