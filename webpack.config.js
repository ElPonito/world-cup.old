const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:3000',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
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
                test: /\.png/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    plugins: [

        // Plugin to generate index.html from index.tpl.html
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tpl.html'),
            filename: 'index.html',
            inject: 'body'
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