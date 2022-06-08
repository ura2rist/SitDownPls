const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        })
    ],
    module: {
        rules: [
            { 
                test: /\.css$/i, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader'
                ]
            },
            { test : /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `./js/${filename('js')}`
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000
    }
}