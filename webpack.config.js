const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PAGES_PATH = 'src\\pages';
const BUILD_PATH = 'build';
const APP_PATH = fs.realpathSync(process.cwd());

function pagesList(pagesPath = path.resolve(APP_PATH, PAGES_PATH), filePaths = []) {
  const pages = fs.readdirSync(pagesPath);

  pages.forEach(function (page) {
    const filePath = `${pagesPath}/${page}`;
    const fsStat = fs.statSync(filePath);

    if (fsStat.isDirectory()) {
      pagesList(filePath, filePaths);
    } else if (fsStat.isFile() && /\.ejs$/.test(filePath)) {
      filePaths.push(`${path.parse(filePath).dir}/${path.parse(filePath).name}`);
    }
  });

  return filePaths;
}

function addHtmlPlugin(pages) {
  const result = pages.map((page) => {
    const generateHtmlPages = new HtmlWebpackPlugin({
      filename: `${page.replace(PAGES_PATH, BUILD_PATH)}.html`,
      template: `${page}.ejs`,
    });

    return generateHtmlPages;
  });

  return result;
}

module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'script/main.js',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
      {
        test: /.s[c|a]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets/fonts'), to: path.resolve(__dirname, 'build/fonts') },
        { from: path.resolve(__dirname, 'src/assets/image'), to: path.resolve(__dirname, 'build/image') },
      ],
    }),
  ].concat(addHtmlPlugin(pagesList())),
};
