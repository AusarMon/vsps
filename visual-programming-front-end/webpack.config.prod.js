var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    devtool: 'cheap-source-map',
    // 默认寻找文件夹下面的index.js文件
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ["style", "css", "sass"],
                include: [
                  APP_PATH,
                  path.resolve(ROOT_PATH, 'styles'),
                  path.resolve(ROOT_PATH, 'node_modules/font-awesome'),
                  path.resolve(ROOT_PATH, 'node_modules/react-validation-form'),
                  path.resolve(ROOT_PATH, 'node_modules/react-s-alert'),
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: '可视化编程'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            drop_console: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__SERVER__': false,
            '__CLIENT__': true,
        }),
    ],
};
