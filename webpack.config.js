const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: 'src',
    entry: './src/script/main.js',
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader'] },
            { test : /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}