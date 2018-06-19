const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        port: 3333,
        open: true,

    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // JS ou JSX
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|png|woff|jpg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [

        // Plugin to generate index.html from index.tpl.html
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tpl.html'),
            filename: 'index.html',
            inject: 'body',
            environment: process.env.NODE_ENV
        }),
        new webpack.HotModuleReplacementPlugin(),

        // Load and declare React as global variable (= window.react)
        new webpack.ProvidePlugin({
            React: 'react',
        })
    ],
    resolve: {
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min')
        }
    }
}